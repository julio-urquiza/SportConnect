import mongoose from "mongoose"

const webhookEventSchema = new mongoose.Schema({
  idNotificacion: { type: String, required: true, unique: true },
  tipo: { type: String },
  dataId: { type: String },
  payload: { type: mongoose.Schema.Types.Mixed },
  procesado: { type: Boolean, default: false },
  procesadoEn: { type: Date }
}, { timestamps: true })

export default mongoose.model("WebhookEvent", webhookEventSchema)