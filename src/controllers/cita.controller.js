const Cita = require('../services/cita.service');

// Obtener todas
exports.getAllCitas = async (req, res) => {
  try {
    const data = await Cita.getAllCitas();
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener citas", error: err });
  }
};

// Obtener por ID
exports.getCitaById = async (req, res) => {
  try {
    const data = await Cita.getCitaById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Cita no encontrada" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener cita", error: err });
  }
};

// Crear
exports.createCita = async (req, res) => {
  try {
    const data = await Cita.createCita(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al crear cita", error: err });
  }
};

// Actualizar
exports.updateCita = async (req, res) => {
  try {
    await Cita.updateCita(req.params.id, req.body);
    res.json({ message: "Cita actualizada" });
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar cita", error: err });
  }
};

// Eliminar
exports.deleteCita = async (req, res) => {
  try {
    await Cita.deleteCita(req.params.id);
    res.json({ message: "Cita eliminada" });
  } catch (err) {
    res.status(500).send({ message: "Error al eliminar cita", error: err });
  }
};