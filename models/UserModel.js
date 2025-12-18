// MODELO - Datos (eschemas) en mongoose

const mongoose = require('mongoose')

// definir esquema
const userSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    edad: {type: Number},
    password: {type: String, required: true, minlength: 6}
},{ timestamps: true });

// Crear el modelo a partir del esquema

module.exports = mongoose.model("User", userSchema)

