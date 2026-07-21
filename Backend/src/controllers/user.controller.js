import userService from "../services/user.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class UserController {
    constructor(service) {
        this.service = service
    }

    register = async (req, res) => {
        const data = await this.service.registerUser(req.body)
        res.status(201).cookie("Token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        }).json({ 'user': data.user })
    }

    login = async (req, res) => {
        const data = await this.service.loginUser(req.body)
        res.status(201).cookie("Token", data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        }).json({ 'user': data.user })
    }

    me = async (req, res) => {
        const { _id } = req.user
        const user = await this.service.validateUser(_id)
        res.status(201).json({ message: "token validated successfully", user })
    }

    logout = async (req, res) => {
        res.status(201)
            .clearCookie("Token", {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            })
            .json({ message: "Logged out successfully" })
    }
}

export default wrapRoutes(new UserController(userService))