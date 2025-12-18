
const jwt = require('jsonwebtoken')

const createToken = (userId) => {
    return jwt.sign(
        {id: userId},           //id de usuario
        process.env.JWT_SECRET, //secreto de jwt en _env
        {expiresIn: process.env.JWT_EXPIRES_IN}//tiempo de expiracion
    )
}


module.exports = { createToken }