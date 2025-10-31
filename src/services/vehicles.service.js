const pool = require('../config/db.config');

// Obtener todos los vehículos
const getAllvehicles = async () => {
  const [rows] = await pool.query('SELECT * FROM vehicles');
  return rows;
};

// Obtener un vehículo por ID
const getvehicleById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM vehicles WHERE idVehicle = ?', [id]);
  return rows[0];
};

// Crear un vehículo
const createVehicle = async (vehiculo) => {
  const { brand, model, year, color, idVehicleType, idUser } = vehiculo;
  const [result] = await pool.query(
    'INSERT INTO vehicles (brand, model, year, color, idVehicleType, idUser) VALUES (?, ?, ?, ?, ?, ?)',
    [brand, model, year, color, idVehicleType, idUser]
  );
  return { id: result.insertId, ...vehiculo };
};

// Actualizar un vehículo
const updateVehicle = async (id, vehiculo) => {
  const { brand, model, year, color, idVehicleType, idUser } = vehiculo;
  await pool.query(
    'UPDATE vehicles SET brand = ?, model = ?, year = ?, color = ?, idVehicleType = ?, idUser = ? WHERE idVehicle = ?',
    [brand, model, year, color, idVehicleType, idUser, id]
  );
  return { id, ...vehiculo };
};

// Eliminar un vehículo
const deleteVehicle = async (id) => {
  await pool.query('DELETE FROM vehicles WHERE idVehicle = ?', [id]);
  return { message: 'Vehículo eliminado' };
};

module.exports = {
  getAllvehicles,
  getvehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
};