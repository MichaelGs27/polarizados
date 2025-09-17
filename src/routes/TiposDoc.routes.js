
const express = require('express');
const router = express.Router();
const TiposDocController = require('../controllers/TiposDoc.controller');

router.get('/', TiposDocController.findAll);
router.get('/:id', TiposDocController.findById);
router.post('/', TiposDocController.create);
router.put('/:id', TiposDocController.update);
router.delete('/:id', TiposDocController.remove);

module.exports = router;