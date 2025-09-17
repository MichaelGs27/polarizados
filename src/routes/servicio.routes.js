
const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicio.controller');

router.get('/', servicioController.findAll);
router.get('/:id', servicioController.findById);
router.post('/', servicioController.create);
router.put('/:id', servicioController.update);
router.delete('/:id', servicioController.remove);

module.exports = router;