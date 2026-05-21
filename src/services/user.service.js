import UsuarioDao from "../daos/mongoDB/usuario-dao.js"
import { createHash } from "../utils/user-bcrypt.js"

export const registerUser = async ({nombre, apellido, email, password, rol }) => {
    const hashedPassword = createHash(password)
    return await UsuarioDao.create({nombre, apellido, email, password: hashedPassword, rol })
}


