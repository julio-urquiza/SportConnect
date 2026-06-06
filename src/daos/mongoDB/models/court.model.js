import mongoose from "mongoose"

const canchaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },

  deporte: {
    type: String,
    required: true,
    enum: ["futbol", "padel", "tenis", "basquet"]
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

  precioPorHora: {
    type: Number,
    required: true
  },

  imagenes: [{
    type: String
  }],

  disponible: {
    type: Boolean,
    default: true
  },

  servicios: [{
    type: String
  }],

  horariosDisponibles: [{
    inicio: String,
    fin: String
  }],

  duenio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }

})

export default mongoose.model("Courts", canchaSchema)