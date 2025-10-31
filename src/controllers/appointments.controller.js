const appointments = require('../services/appointments.service'); 

// Obtener todas las appointments (mapeando a getAllappointments del servicio)
exports.getAllappointments = async (req, res) => {
  try {
    const data = await appointments.getAllappointments(); 
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener appointments", error: err.message });
  }
};

// Obtener appointments por ID (mapeando a getappointmentsById del servicio)
exports.getappointmentsById = async (req, res) => {
  try {
    // La función en el servicio es getappointmentsById
    const data = await appointments.getappointmentsById(req.params.id); 
    if (!data) {
      return res.status(404).send({ message: "appointments no encontrada" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al obtener appointments", error: err.message });
  }
};
// Crear nueva appointments (mapeando a createappointments del servicio)
exports.createappointments = async (req, res) => {
  try {
    const data = await appointments.createappointments(req.body); 
    res.status(201).json(data);
  } catch (err) {
    res.status(500).send({ message: "Error al crear appointments", error: err.message });
  }
};
// Actualizar appointments (mapeando a updateappointments del servicio)
exports.updateappointments = async (req, res) => {
  try {
    await appointments.updateappointments(req.params.id, req.body); 
    res.json({ message: "appointments actualizada" });
  } catch (err) {
    res.status(500).send({ message: "Error al actualizar appointments", error: err.message });
  }
};

// Eliminar appointments (mapeando a deleteappointments del servicio)
exports.deleteappointments = async (req, res) => {
  try {
    await appointments.deleteappointments(req.params.id); 
    res.json({ message: "appointments eliminada" });
  } catch (err) {
    res.status(500).send({ message: "Error al eliminar appointments", error: err.message });
  }
};