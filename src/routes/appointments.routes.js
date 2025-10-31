const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments.controller');

router.get('/', appointmentsController.getAllappointments);
router.get('/:id', appointmentsController.getappointmentsById);
router.post('/', appointmentsController.createappointments);
router.put('/:id', appointmentsController.updateappointments);
router.delete('/:id', appointmentsController.deleteappointments);

module.exports = router;