
const express = require('express');
const router = express.Router();
const promocionController = require('../controllers/promocion.controller');

router.get('/', promocionController.findAll);
router.get('/:id', promocionController.findById);
router.post('/', promocionController.create);
router.put('/:id', promocionController.update);
router.delete('/:id', promocionController.remove);

module.exports = router;