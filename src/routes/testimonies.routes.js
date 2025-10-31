
const express = require('express');
const router = express.Router();
const testimoniesController = require('../controllers/testimonies.controller');

router.get('/', testimoniesController.findAll);
router.get('/:id', testimoniesController.findById);
router.post('/', testimoniesController.create);
router.put('/:id', testimoniesController.update);
router.delete('/:id', testimoniesController.remove);

module.exports = router;