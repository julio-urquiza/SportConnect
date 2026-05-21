import { registerUser } from "../services/user.service.js"
import UsuarioDao from "../daos/mongoDB/usuario-dao.js"

class UserController{
    constructor(service){
        this.service=service
    }


    register = async (req, res) => {
        try {
            const user = await registerUser(req.body)
            res.status(201).json({ message: "Usuario creado", user })
        } catch (error) {
            res.status(500).json({ message: "Error al crear usuario", error })
        }
    }

}

export default new UserController(registerUser);