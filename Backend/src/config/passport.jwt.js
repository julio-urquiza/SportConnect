import passport from "passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import "dotenv/config"

const strategyConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies.Token
        }
        return token;
    }]),
    secretOrKey: process.env.CLAVE_JWT
}

const verifyToken = (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { messages: "Invalid Token" })
    return done(null, jwt_payload)
}

passport.use("jwt", new Strategy(strategyConfig, verifyToken))

export default passport