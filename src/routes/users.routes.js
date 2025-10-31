
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const VerifyToken = require('../middleware/auth.middleware');

router.get('/',VerifyToken, usersController.findAll);
router.get('/:id',VerifyToken, usersController.findById);
router.post('/',VerifyToken, usersController.create);
router.put('/:id',VerifyToken, usersController.update);
router.delete('/:id',VerifyToken, usersController.remove);

module.exports = router;