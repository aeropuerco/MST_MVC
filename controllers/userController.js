// CONTROLADOR -- Contiene la lógica (funciones) que se ejecutan despues de llamar a las rutas

// Recibe la peticion (req)  >>> Usa el modelo (importamos el modelo) y >> responde (res)

//importar modelos
const User = require('../models/UserModel')

// TRAER TODOS LOS USUARIOS - Read - GET - /home
const getAllUsers = async (req,res) => {
    const allUsers = await User.find()
    res.status(200).json(allUsers)
}



// Traer un usuario por ID - Read - GET - /:id
const getUserById = async (req,res) => {
    try {
        const { id } = req.params; //path variable con params
        const user = await User.findById(id)
        
        if(!user){
            return res.status(404).json({ error: "Usuario no encontado"}) // not found
        }

        return res.status(200).json(user) // 200 : OK
    } catch (error) {
        return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido

    }

}

// Crear un usuario - Create - POST - /
const createUser = async (req,res, next)=> {
    try{
        
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
     
        res.status(201).json(savedUser);
    }
    catch (err) {
        //manejo del error de la petición
        res.status(400).json({error: err.message}) // 400: Bad request

    }
}

// Actualizar un usuario - Update - PUT - /:id

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}) 
        
        if (!updateUser) {
            return res.status(404).json({error: "Usuario no encontrado"})
            
        }

        return res.status(200).json(updateUser) // Todo ok, devuelve el usuario

    } catch (err) {
         return res.status(400).json( { error: 'ID invalido'}) // 400: Id no es valido
    }
    
}

// Eliminar un usuario - Delete - DELETE - /:id

const deleteUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json('Usuario no encontrado')

        }

        return res.status(200).json('Usuario eliminado correctamente')

        
    } catch (err) {
        next(err)

    }
    
}


// EXPORTACIONES

module.exports  = { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}