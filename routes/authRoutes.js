const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')


const { register, login, getProfile } = require('../controllers/authController')

//RUTAS PUBLICAS
router.post('/register', register)
router.post('/login', login)

//RUTAS PROTEGIDAS
// LAS PASAMOS POR EL MIDDLEWARE DE AUTH PARA HACERLA PROTEGIDA
router.get('/profile', auth, getProfile)

module.exports = router;