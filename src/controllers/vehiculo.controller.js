const Vehiculo = require('../services/vehiculo.service');

// Obtener todos
exports.getAllVehiculos = async (req, res) => {
    try {
        const data = await Vehiculo.getAllVehiculos();
        res.json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al obtener vehículos", error: err });
    }
};

// Obtener por ID
exports.getVehiculoById = async (req, res) => {
    try {
        const data = await Vehiculo.getVehiculoById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al obtener vehículo", error: err });
    }
};

// Crear
exports.createVehiculo = async (req, res) => {
    try {
        const data = await Vehiculo.createVehiculo(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(500).send({ message: "Error al crear vehículo", error: err });
    }
};

// Actualizar
exports.updateVehiculo = async (req, res) => {
    try {
        await Vehiculo.updateVehiculo(req.params.id, req.body);
        res.json({ message: "Vehículo actualizado" });
    } catch (err) {
        res.status(500).send({ message: "Error al actualizar vehículo", error: err });
    }
};

// Eliminar
exports.deleteVehiculo = async (req, res) => {
    try {
        await Vehiculo.deleteVehiculo(req.params.id);
        res.json({ message: "Vehículo eliminado" });
    } catch (err) {
        res.status(500).send({ message: "Error al eliminar vehículo", error: err });
    }
};