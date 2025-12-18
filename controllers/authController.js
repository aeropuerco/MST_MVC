const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const { createToken } = require('../utils/createToken')


// registro

const register = async (req, res) => {
    try {
        const {nombre, email, edad, password} = req.body;

        
        if (!nombre | !email | !password){
            return res.status(400).json({error: "Nombre, email y clave son obligatorios"})
        }

        //Buscamos por email, porque es unico en bbdd
        const prevUser = await User.findOne({ email })

        // SI ya existe, damos un error.
        if (prevUser){
            return res.status(409).json({error: "El email ya esta registrado"})
        }

        const hashedPass = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))

       
        // Creamos el usuario con la contraseña hasheada, no con la que ha puesto el usuario
        const newUser = await User.create({ nombre,email,edad, password: hashedPass})

         
        // el id en MONGODB se indica con _id
        const token = createToken(newUser._id)

        return res.status(201).json({
            user: {
                id: newUser._id,
                nombre:newUser.nombre,
                email: newUser.email,
                edad: newUser.edad
            }, token
        })
    } catch (err) {
        return res.status(500).json({error: 'Error de servidor'})

    }
}

const login = async (req,res) =>{
    try {
        const { email, password} = req.body;

        //Validación de los campos de entrada del login
        if (!email || !password) {
            return res.status(400).json({error: 'email y passwd son obligatorios'})
        }
        
        // Buscar al usuario por su email

        const user = await User.findOne({email})

        // No indicamos que ha fallado el email o la pass para no dar pistas
        if(!user){
            return res.status(400).json({error: 'Credenciales inválidas'})
        }

        // Comparar las contraseñas del usuario con la de req.body
        const passwordOk = await bcrypt.compare(password, user.password)

        // No indicamos que ha fallado el email o la pass para no dar pistas
        if (!passwordOk){
            return res.status(400).json({error: 'Credenciales inválidas'})
        }

        // creamos el token de la sesión si la pass estaba bien

        const token = createToken(user._id)


        // responder sin exponer la contraseña
        return res.status(200).json({
            user:{
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                edad: user.edad
            },
            token
        })

        

    } catch (err) {
        return res.status(500).json({error: 'Error en el servidor, login'})
    }
}

// get profile
const getProfile = async (req, res) => {
    try {
        // cogemos el ID del middleware, que trae el id del token
        // con select, excluimos el password de la respuesta

        const user = await User.findById(req.user.id);
        if (!user){
            return res.status(404).json({error:'Usuario no encontrado'})
        }

        return res.status(200).json(user)

    } catch (err) {
                return res.status(500).json({error: 'Error en el servidor, getProfile'})
    }
}
module.exports = { register, login, getProfile };