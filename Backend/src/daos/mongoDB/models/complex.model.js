import mongoose from "mongoose"

const complexSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  descripcion: {
    type: String
  },

  ubicacion: {
    type: String,
    required: true
  },

  direccion: {
    type: String,
    required: true
  },

  imagenes: [{
    type: String
  }],

  duenio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
})

export default mongoose.model("Complex", complexSchema)