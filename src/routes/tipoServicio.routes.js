const express = require('express');
const router = express.Router();
const tipoServicioController = require('../controllers/tipoServicio.controller');

router.get('/', tipoServicioController.getAll);
router.get('/:id', tipoServicioController.getById);
router.post('/', tipoServicioController.create);
router.put('/:id', tipoServicioController.update);
router.delete('/:id', tipoServicioController.remove);

module.exports = router;