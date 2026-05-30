import { body } from "express-validator"
import usuarioDao from "../daos/mongoDB/usuario-dao.js"
import { createHash } from "../utils/user-bcrypt.js"

class UserService {
    constructor(dao){
        this.dao = dao
    }

    registerUser = async (body) => {
        const {email, password, role } = body
        const hashedPassword = createHash(password)
        const retorno = await this.dao.create({email, password: hashedPassword, role })
        return retorno
    }

    loginUser = async (body) => {
        // const {email, password} = body
    }
}    

export default new UserService(usuarioDao)

