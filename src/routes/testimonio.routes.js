
const express = require('express');
const router = express.Router();
const testimonioController = require('../controllers/testimonio.controller');

router.get('/', testimonioController.findAll);
router.get('/:id', testimonioController.findById);
router.post('/', testimonioController.create);
router.put('/:id', testimonioController.update);
router.delete('/:id', testimonioController.remove);

module.exports = router;