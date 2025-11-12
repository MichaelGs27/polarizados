const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas públicas
router.get('/public-profile/:idUser', usersController.getPublicProfile);

// Rutas privadas (protegidas)
router.get('/profile', verifyToken, usersController.getProfile);
router.put('/update', verifyToken, usersController.update);
router.delete('/delete', verifyToken, usersController.delete);
router.get('/dashboard', verifyToken, usersController.getDashboard);
router.post('/change-password', verifyToken, usersController.changePassword);

module.exports = router;
