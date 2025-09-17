const pool = require('../config/db.config');

// Obtener todas las citas
const getAllCitas = async () => {
  const [rows] = await pool.query('SELECT * FROM citas');
  return rows;
};

// Obtener cita por ID
const getCitaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM citas WHERE idCita = ?', [id]);
  return rows[0];
};

// Crear nueva cita
const createCita = async (cita) => {
  const { idVehiculo, n_Fecha, estado, observaciones } = cita;
  const [result] = await pool.query(
    'INSERT INTO citas (idVehiculo, n_Fecha, estado, observaciones) VALUES (?, ?, ?, ?)',
    [idVehiculo, n_Fecha, estado || 'Pendiente', observaciones || null]
  );
  return { id: result.insertId, ...cita };
};

// Actualizar cita
const updateCita = async (id, cita) => {
  const { idVehiculo, n_Fecha, estado, observaciones } = cita;
  await pool.query(
    'UPDATE citas SET idVehiculo = ?, n_Fecha = ?, estado = ?, observaciones = ? WHERE idCita = ?',
    [idVehiculo, n_Fecha, estado, observaciones, id]
  );
  return { id, ...cita };
};

// Eliminar cita
const deleteCita = async (id) => {
  await pool.query('DELETE FROM citas WHERE idCita = ?', [id]);
  return { message: 'Cita eliminada' };
};

module.exports = {
  getAllCitas,
  getCitaById,
  createCita,
  updateCita,
  deleteCita,
};