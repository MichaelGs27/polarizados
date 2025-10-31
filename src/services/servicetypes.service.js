const pool = require('../config/db.config');

exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM servicetypes');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM servicetypes WHERE idServiceType = ?', [id]);
  return rows[0];
};

exports.create = async (data) => {
  const { idService, serviceTypeName, price } = data;
  const [result] = await pool.query(
    'INSERT INTO servicetypes (idService, serviceTypeName, price) VALUES (?, ?, ?)',
    [idService, serviceTypeName, price]
  );
  return { id: result.insertId, ...data };
};

exports.update = async (id, data) => {
  const { idService, serviceTypeName, price } = data;
  await pool.query(
    'UPDATE servicetypes SET idService = ?, serviceTypeName = ?, price = ? WHERE idServiceType = ?',
    [idService, serviceTypeName, price, id]
  );
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM servicetypes WHERE idServiceType = ?', [id]);
};