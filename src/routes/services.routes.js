
const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services.controller');

router.get('/', servicesController.findAll);
router.get('/:id', servicesController.findById);
router.post('/', servicesController.create);
router.put('/:id', servicesController.update);
router.delete('/:id', servicesController.remove);

module.exports = router;