const tipoServicioService = require('../services/servicetypes.service.js');

exports.getAll = async (req, res) => {
  try {
    const result = await tipoServicioService.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const result = await tipoServicioService.getById(req.params.id);
    if (!result) return res.status(404).json({ message: "Tipo de servicio no encontrado" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await tipoServicioService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await tipoServicioService.update(req.params.id, req.body);
    res.json({ message: "Tipo de servicio actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await tipoServicioService.remove(req.params.id);
    res.json({ message: "Tipo de servicio eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};