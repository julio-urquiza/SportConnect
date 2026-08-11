import mongoose from "mongoose"

/**
 * Representa UNA hora ocupada de UNA cancha en UNA fecha.
 * Una reserva de varias horas genera varios documentos (uno por hora).
 *
 * El índice único es lo que garantiza, a nivel de base de datos,
 * que dos reservas no puedan ocupar la misma hora de la misma cancha
 * — incluso bajo alta concurrencia.
 */
const reservedSlotSchema = new mongoose.Schema({
  cancha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courts",
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  hora: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  reserva: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reserve",
    required: true
  }
})

reservedSlotSchema.index({ cancha: 1, fecha: 1, hora: 1 }, { unique: true })

// Para liberar/borrar rápido todos los slots de una reserva
reservedSlotSchema.index({ reserva: 1 })

export default mongoose.model("ReservedSlot", reservedSlotSchema)