const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles.controller');

router.get('/', vehiclesController.getAllvehicles);
router.get('/:id', vehiclesController.getvehicleById);
router.post('/', vehiclesController.createVehicle);
router.put('/:id', vehiclesController.updateVehicle);
router.delete('/:id', vehiclesController.deleteVehicle);

module.exports = router;