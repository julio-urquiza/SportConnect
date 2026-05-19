import {usuarioModel} from "./models/usuario-model"
import MongoDao from "./mongo-dao"

class UsuarioDao extends MongoDao{
    constructor(model){
        super(model); 
    }

    save= async(usuario)=>{
        try{
            const nuevoUsuario= new Usuario(usuario);
        }catch(error){
            throw new error(error);
        }
    }

    getByEmail= async(email)=>{
        try{
            return await this.model.findOne({email});
        }catch(error){
            throw new error(error);
        }
    }
}