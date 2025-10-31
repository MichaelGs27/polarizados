
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio.controller');

router.get('/', portfolioController.getAllPortfolio);
router.get('/:id', portfolioController.getPortfolioById);
router.post('/', portfolioController.createPortfolio);
router.put('/:id', portfolioController.updatePortfolio);
router.delete('/:id', portfolioController.removePortfolio);

module.exports = router;