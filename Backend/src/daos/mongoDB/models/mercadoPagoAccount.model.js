import mongoose from "mongoose"
import { decrypt, encrypt } from "../../../utils/tokenCrypto.js"

const mercadoPagoAccountSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true
    },

    mpUserId: {
      type: Number,
      required: true
    },

    accessToken: {
      type: String,
      required: true,
      select: false
    },

    refreshToken: {
      type: String,
      required: true,
      select: false
    },

    publicKey: {
      type: String
    },

    scope: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    tokenType: {
      type: String,
      default: "bearer"
    },

    liveMode: {
      type: Boolean,
      default: true
    },

    status: {
      type: String,
      enum: ["connected", "disconnected", "revoked", "error"],
      default: "connected",
      required: true
    },

    connectedAt: {
      type: Date,
      default: Date.now
    },

    lastRefreshedAt: {
      type: Date
    },

    disconnectedAt: {
      type: Date
    },

    nickname: {
      type: String
    },

    email: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

/*
 * Índice único parcial: un usuario solo puede tener UNA cuenta
 * con status "connected" a la vez. Permite conservar históricos
 * "disconnected"/"revoked" sin violar unicidad.
 */
mercadoPagoAccountSchema.index(
  { usuario: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "connected" }
  }
)

// Índice para el job de renovación proactiva de tokens
mercadoPagoAccountSchema.index({ status: 1, expiresAt: 1 })

// Índice para resolver rápidamente por collector_id (útil al procesar webhooks)
mercadoPagoAccountSchema.index({ mpUserId: 1 })

/**
 * Hook pre-save: cifra accessToken y refreshToken antes de persistir,
 * pero solo si fueron modificados (evita re-cifrar en cada save si no cambiaron).
 */
mercadoPagoAccountSchema.pre("save", function encryptTokensBeforeSave(next) {
  try {
    if (this.isModified("accessToken")) {
      this.accessToken = encrypt(this.accessToken)
    }

    if (this.isModified("refreshToken")) {
      this.refreshToken = encrypt(this.refreshToken)
    }

    next()
  } catch (error) {
    next(error)
  }
})

/**
 * Devuelve el access_token en texto plano.
 * Requiere que el documento haya sido consultado con
 * .select("+accessToken").
 * @returns {string}
 */
mercadoPagoAccountSchema.methods.getDecryptedAccessToken = function getDecryptedAccessToken() {
  if (!this.accessToken) {
    throw new Error(
      "accessToken no fue seleccionado en la consulta. Usá .select('+accessToken')"
    )
  }
  return decrypt(this.accessToken)
}

/**
 * Devuelve el refresh_token en texto plano.
 * Requiere que el documento haya sido consultado con
 * .select("+refreshToken").
 * @returns {string}
 */
mercadoPagoAccountSchema.methods.getDecryptedRefreshToken = function getDecryptedRefreshToken() {
  if (!this.refreshToken) {
    throw new Error(
      "refreshToken no fue seleccionado en la consulta. Usá .select('+refreshToken')"
    )
  }
  return decrypt(this.refreshToken)
}

/**
 * Devuelve true si el access_token está vencido o vence dentro
 * de los próximos `bufferMinutes` minutos (por defecto 0).
 * @param {number} [bufferMinutes=0]
 * @returns {boolean}
 */
mercadoPagoAccountSchema.methods.isExpiringSoon = function isExpiringSoon(bufferMinutes = 0) {
  const bufferMs = bufferMinutes * 60 * 1000
  return this.expiresAt.getTime() - bufferMs <= Date.now()
}

export default mongoose.model("MercadoPagoAccount", mercadoPagoAccountSchema)