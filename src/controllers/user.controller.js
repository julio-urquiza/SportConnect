import { registerUser } from "../services/user.service.js"

export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body)
        res.status(201).json({ message: "Usuario creado", user })
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error })
    }
}