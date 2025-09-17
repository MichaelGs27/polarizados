
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controller');

router.get('/', usuarioController.findAll);
router.get('/:id', usuarioController.findById);
router.post('/', usuarioController.create);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.remove);

module.exports = router;