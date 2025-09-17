const express = require('express');
const router = express.Router();
const faqController = require('../controllers/Faq.controller');

router.get('/', faqController.findAll);
router.get('/:id', faqController.findById);
router.post('/', faqController.create);
router.put('/:id', faqController.update);
router.delete('/:id', faqController.remove);

module.exports = router;