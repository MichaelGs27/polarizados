const tipoVehiculoService = require('../services/tipoVehiculo.service');

// Obtener todos
exports.findAll = async (req, res) => {
  try {
    const data = await tipoVehiculoService.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tipos de vehículos", error });
  }
};

// Obtener por ID
exports.findById = async (req, res) => {
  try {
    const data = await tipoVehiculoService.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tipo de vehículo", error });
  }
};

// Crear
exports.create = async (req, res) => {
  try {
    const nuevo = await tipoVehiculoService.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tipo de vehículo", error });
  }
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const updated = await tipoVehiculoService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    res.status(200).json({ message: "Tipo de vehículo actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tipo de vehículo", error });
  }
};

// Eliminar
exports.remove = async (req, res) => {
  try {
    const removed = await tipoVehiculoService.remove(req.params.id);
    if (!removed) return res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    res.status(200).json({ message: "Tipo de vehículo eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tipo de vehículo", error });
  }
};