const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        const header = req.headers.authorization || "";
        const [type, token] = header.split(" ") // "Bearer token"

        // Si no hay Bearer o no hay Token
        if (type !== "Bearer" || !token) {
            return res.status(401).json({error: "Token no proporcionado"})
        }

        // SI hay token > Verificmos el token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id : verifyToken.id }

        next();

    } catch (err) {
        return res.status(401).json({error:"Token no válido o expirado"})

    }
}

module.exports = auth;