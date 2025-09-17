const pool = require('../config/db.config');

// Obtener todos los vehículos
const getAllVehiculos = async () => {
  const [rows] = await pool.query('SELECT * FROM vehiculos');
  return rows;
};

// Obtener un vehículo por ID
const getVehiculoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM vehiculos WHERE idVehiculo = ?', [id]);
  return rows[0];
};

// Crear un vehículo
const createVehiculo = async (vehiculo) => {
  const { marca, modelo, año, color, idTipoVehiculo } = vehiculo;
  const [result] = await pool.query(
    'INSERT INTO vehiculos (marca, modelo, año, color, idTipoVehiculo) VALUES (?, ?, ?, ?, ?)',
    [marca, modelo, año, color, idTipoVehiculo]
  );
  return { id: result.insertId, ...vehiculo };
};

// Actualizar un vehículo
const updateVehiculo = async (id, vehiculo) => {
  const { marca, modelo, año, color, idTipoVehiculo } = vehiculo;
  await pool.query(
    'UPDATE vehiculos SET marca = ?, modelo = ?, año = ?, color = ?, idTipoVehiculo = ? WHERE idVehiculo = ?',
    [marca, modelo, año, color, idTipoVehiculo, id]
  );
  return { id, ...vehiculo };
};

// Eliminar un vehículo
const deleteVehiculo = async (id) => {
  await pool.query('DELETE FROM vehiculos WHERE idVehiculo = ?', [id]);
  return { message: 'Vehículo eliminado' };
};

module.exports = {
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo
};