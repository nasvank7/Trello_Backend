
import jwt from 'jsonwebtoken'
const generateJwt = (data: string) => {
    const SECRET_KEY = "Jwt_Secret"
    const token = jwt.sign({ data: data }, SECRET_KEY, { expiresIn: "1d" })
    if (token) {
        return token
    }
    return null
}

export { generateJwt }
