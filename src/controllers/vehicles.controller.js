const Vehiculo = require('../services/vehicles.service');

// Obtener todos
exports.getAllvehicles = async (req, res) => {
    try {
        const data = await Vehiculo.getAllvehicles();
        res.json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al obtener vehículos", error: err });
    }
};

// Obtener por ID
exports.getvehicleById = async (req, res) => {
    try {
        const data = await Vehiculo.getvehicleById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al obtener vehículo", error: err });
    }
};

// Crear
exports.createVehicle = async (req, res) => {
    try {
        const data = await Vehiculo.createVehicle(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al crear vehículo", error: err });
    }
};

// Actualizar
exports.updateVehicle = async (req, res) => {
    try {
        await Vehiculo.updateVehicle(req.params.id, req.body);
        res.json({ message: "Vehículo actualizado" });
    } catch (err) {
        res.status(500).send({ message: "Error al actualizar vehículo", error: err });
    }
};

// Eliminar
exports.deleteVehicle = async (req, res) => {
    try {
        await Vehiculo.deleteVehicle(req.params.id);
        res.json({ message: "Vehículo eliminado" });
    } catch (err) {
        res.status(500).send({ message: "Error al eliminar vehículo", error: err });
    }
};