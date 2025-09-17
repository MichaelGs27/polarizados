const db = require('../config/db.config');

// Obtener todos
exports.findAll = async () => {
  const [rows] = await db.execute('SELECT * FROM tiposvehiculos'); 
  return rows;
};

// Obtener por id
exports.findById = async (id) => {
  const [rows] = await db.execute(
    'SELECT * FROM tiposvehiculos WHERE idTipoVehiculo = ?', 
    [id]
  );
  return rows[0];
};

// Crear
exports.create = async (data) => {
  const [result] = await db.execute(
    'INSERT INTO tiposvehiculos (tipoVehiculo) VALUES (?)',
    [data.tipoVehiculo]   // 👈 usar el nombre real de la columna
  );
  return { id: result.insertId, ...data };
};

// Actualizar
exports.update = async (id, data) => {
  const [result] = await db.execute(
    'UPDATE tiposvehiculos SET tipoVehiculo = ? WHERE idTipoVehiculo = ?',
    [data.tipoVehiculo, id]
  );
  return result.affectedRows > 0;
};

// Eliminar
exports.remove = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM tiposvehiculos WHERE idTipoVehiculo = ?', 
    [id]
  );
  return result.affectedRows > 0;
};