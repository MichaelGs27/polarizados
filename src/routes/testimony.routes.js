
const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimony.controller');

router.get('/', testimonyController.findAll);
router.get('/:id', testimonyController.findById);
router.post('/', testimonyController.create);
router.put('/:id', testimonyController.update);
router.delete('/:id', testimonyController.remove);

module.exports = router;