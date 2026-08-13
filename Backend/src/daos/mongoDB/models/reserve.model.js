import mongoose from "mongoose"

const ReserveSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    cancha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courts",
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horarios: {
        dia: {
            type: Number,
            min: 0,
            max: 6,
        },
        horas: [
            {
                type: Number,
                min: 0,
                max: 23,
            },
        ],
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: [
            "pendiente_pago",
            "confirmada",
            "cancelada",
            "expirada",
            "finalizada",
            "reembolsada"
        ],
        default: "pendiente_pago"
    },

    // --- Datos de Mercado Pago ---
    mpPreferenceId: { type: String },
    mpPaymentId: { type: String },
    mpStatus: { type: String },
    mpStatusDetail: { type: String },

    // --- Montos ---
    montoTotal: { type: Number },
    comisionSportConnect: { type: Number, default: 0 },
    montoDuenio: { type: Number },

    // --- Tiempos del ciclo de vida ---
    expiraEn: { type: Date },
    pagadoEn: { type: Date },

    // --- Cancelación ---
    canceladoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users" // corregido
    },
    motivoCancelacion: { type: String },

    // --- Reembolso ---
    montoReembolsado: { type: Number },
    reembolsadoEn: { type: Date },
    reembolsadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users" // corregido
    }
}, {
    timestamps: true
})

// La prevención de double-booking la garantiza el índice único
// de ReservedSlot (una hora ocupada = un documento), no un índice acá.

ReserveSchema.index({ estado: 1, expiraEn: 1 })
ReserveSchema.index({ mpPaymentId: 1 })

export default mongoose.model("Reserve", ReserveSchema)