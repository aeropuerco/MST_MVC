// Middleware centralizado de gestion de errores

const errors = (err, req, res, next) => {
    console.log("🔴 Error", err.message)

    // Error de servidor
    if (!err.status){
        return res.status(500).json({error:"Error interno del servidor"})
    }

    // Error de usuario no encontrado
    if (err.status === 404){
        return res.status(404).json({error:"Usuario no encontrado"})
    }


    // Por defecto
    return res.status(err.status).json({error:err.message})
} 

module.exports = errors;