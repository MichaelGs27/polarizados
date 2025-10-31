const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller'); 

// 1. Ruta para que el usuario se registre por primera vez
router.post('/register', authController.register);

// 2. Ruta para que el usuario inicie sesión y OBTENGA el token
router.post('/login', authController.login);

module.exports = router;