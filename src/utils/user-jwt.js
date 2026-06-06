import jwt from "jsonwebtoken"

const generateToken = (user, clave, expires) => {
    const payload = {
        _id: user._id,
        iat: Math.floor(Date.now() / 1000),
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, clave, {expiresIn: `${expires}h`})
}

export default generateToken