import mongoose from "mongoose"

const UsuarioSchema= new mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    },
});





export const usuarioModel = mongoose.model("Usuario", UsuarioSchema)