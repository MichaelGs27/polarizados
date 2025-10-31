const express = require('express');
const router = express.Router();
const servicetypesController = require('../controllers/servicetypes.controller.js');

router.get('/', servicetypesController.getAll);
router.get('/:id', servicetypesController.getById);
router.post('/', servicetypesController.create);
router.put('/:id', servicetypesController.update);
router.delete('/:id', servicetypesController.remove);

module.exports = router;