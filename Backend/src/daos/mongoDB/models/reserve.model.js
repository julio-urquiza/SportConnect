import mongoose from "mongoose";

const ReserveSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    cancha: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cancha",
      required: true,
    },
    complejo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complejo",
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    horarios: {
      dia: Number,
      inicio: Number,
      fin: Number,
    },
    precio: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "confirmada", "cancelada", "finalizada"],
      default: "confirmada",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Reserve", ReserveSchema);
