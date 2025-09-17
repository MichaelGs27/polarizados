const pool = require('../config/db.config');

exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM tiposservicios');
  return rows;
};

exports.getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tiposservicios WHERE idTipoServicio = ?', [id]);
  return rows[0];
};

exports.create = async (data) => {
  const { idServicio, nombreTipoServicio, precio } = data;
  const [result] = await pool.query(
    'INSERT INTO tiposservicios (idServicio, nombreTipoServicio, precio) VALUES (?, ?, ?)',
    [idServicio, nombreTipoServicio, precio]
  );
  return { id: result.insertId, ...data };
};

exports.update = async (id, data) => {
  const { idServicio, nombreTipoServicio, precio } = data;
  await pool.query(
    'UPDATE tiposservicios SET idServicio = ?, nombreTipoServicio = ?, precio = ? WHERE idTipoServicio = ?',
    [idServicio, nombreTipoServicio, precio, id]
  );
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM tiposservicios WHERE idTipoServicio = ?', [id]);
};