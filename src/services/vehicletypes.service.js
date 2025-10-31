const db = require('../config/db.config');

// Obtener todos
exports.findAll = async () => {
  const [rows] = await db.execute('SELECT * FROM vehicletypes'); 
  return rows;
};

// Obtener por id
exports.findById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM vehicletypes WHERE idVehicleType = ?', 
    [id]
  );
  return rows[0];
};

// Crear
exports.create = async (data) => {
  const [result] = await db.execute(
    'INSERT INTO vehicletypes (vehicleType) VALUES (?)',
    [data.vehicleType]
  );
  return { id: result.insertId, ...data };
};

// Actualizar
exports.update = async (id, data) => {
  const [result] = await db.execute(
    'UPDATE vehicletypes SET vehicleType = ? WHERE idVehicleType = ?',
    [data.vehicleType, id]
  );
  return result.affectedRows > 0;
};

// Eliminar
exports.remove = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM vehicletypes WHERE idVehicleType = ?', 
    [id]
  );
  return result.affectedRows > 0;
};