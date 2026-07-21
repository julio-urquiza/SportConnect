import { body } from "express-validator"
import usuarioDao from "../daos/mongoDB/usuario.dao.js"
import { createHash, isValidPassword } from "../utils/user-bcrypt.js"
import generateToken from "../utils/user-jwt.js"
import CustomError from "../utils/customError.js"
import UserDTO from "../dtos/user.dto.js"
import 'dotenv/config'

class UserService {
    constructor(dao) {
        this.dao = dao
    }

    registerUser = async (body) => {
        const { email, password, role } = body
        const hashedPassword = createHash(password)
        const user = await this.dao.create({ email, password: hashedPassword, role })
        if (!user) throw new CustomError(400, 'El usuario no se pudo crear')
        return {'user':new UserDTO(user), 'token': generateToken(user, process.env.CLAVE_JWT, 24) }
    }

    loginUser = async (body) => {
        const { email, password } = body
        const user = await this.dao.getByEmail(email)
        if (!user) throw new CustomError(400, 'User not found')
        const valid = isValidPassword(password, user.password)
        if (!valid) throw new CustomError(400, 'Invalid password')
        return {'user': new UserDTO(user), 'token': generateToken(user, process.env.CLAVE_JWT, 24) }
    }

    validateUser = async (id) => {
        const user = await this.dao.getById(id)
        if (!user) throw new CustomError(400, 'User not found')
        return new UserDTO(user)
    }
}

export default new UserService(usuarioDao)

