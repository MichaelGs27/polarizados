
const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotion.controller');

router.get('/', promotionController.findAll);
router.get('/:id', promotionController.findById);
router.post('/', promotionController.create);
router.put('/:id', promotionController.update);
router.delete('/:id', promotionController.remove);

module.exports = router;