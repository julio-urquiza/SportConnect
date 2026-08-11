import mongoose from "mongoose"

/**
 * Almacena temporalmente el parámetro "state" del flujo OAuth
 * de Mercado Pago, para prevenir ataques CSRF durante la vinculación
 * de cuentas. Expira solo (TTL index) a los 10 minutos: tiempo más
 * que suficiente para que el dueño complete el login+autorización
 * en Mercado Pago.
 */

const oauthStateSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    unique: true
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // TTL: Mongo borra el documento a los 600s (10 min)
  }
})

export default mongoose.model("OAuthState", oauthStateSchema)