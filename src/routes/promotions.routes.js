
const express = require('express');
const router = express.Router();
const promotionsController = require('../controllers/promotions.controller');

router.get('/', promotionsController.findAll);
router.get('/:id', promotionsController.findById);
router.post('/', promotionsController.create);
router.put('/:id', promotionsController.update);
router.delete('/:id', promotionsController.remove);

module.exports = router;