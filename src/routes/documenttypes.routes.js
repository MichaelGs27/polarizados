const express = require('express');
const router = express.Router();
const documenttypesController = require('../controllers/documenttypes.controller');

router.get('/', documenttypesController.findAll);
router.get('/:id', documenttypesController.findById);
router.post('/', documenttypesController.create);
router.put('/:id', documenttypesController.update);
router.delete('/:id', documenttypesController.remove);

module.exports = router;