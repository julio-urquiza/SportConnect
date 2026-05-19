import { createUser } from "../daos/user.dao.js"
import { createHash } from "../utils/user-bcrypt.js"

export const registerUser = async ({ email, password }) => {
    const hashedPassword = createHash(password)
    return await createUser({ email, password: hashedPassword })
}