import userModel from "./models/usuario.model.js"
import MongoDao from "./mongo.dao.js"

class UsuarioDao extends MongoDao {
    constructor(model) {
        super(model)
    }
    
    async getByEmail(email) {
        return await this.model.findOne({ email })
    }
}

export default new UsuarioDao(userModel)