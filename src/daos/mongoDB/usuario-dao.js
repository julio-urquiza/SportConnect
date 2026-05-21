import { usuarioModel } from "./models/usuario-model.js"
import MongoDao from "./mongo-dao.js"

class UsuarioDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    save = async (usuario) => {
        try {
            return await this.model.create(usuario)
        } catch (error) {
            throw new Error(error)
        }
    }

    getByEmail = async (email) => {
        try {
            return await this.model.findOne({ email })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default new UsuarioDao(usuarioModel)