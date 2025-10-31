const express = require('express');
const router = express.Router();
const portafolioController = require('../controllers/portafolio.controller');
const verifyToken = require('../middleware/auth.middleware');

// Rutas públicas
router.get('/public-profile/:id', portafolioController.getPublicProfile);

// Rutas privadas (protegidas)
router.get('/profile', verifyToken, portafolioController.getProfile);
router.put('/update', verifyToken, portafolioController.update);
router.delete('/delete', verifyToken, portafolioController.delete);
router.get('/dashboard', verifyToken, portafolioController.getDashboard);

module.exports = router;