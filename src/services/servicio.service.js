const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM servicios');
    return rows;
};

exports.findById = async (idServicio) => {
    const [rows] = await db.execute('SELECT * FROM servicios WHERE idServicio = ?', [idServicio]);
    return rows[0];
};

exports.create = async (newServicio) => {
    const [result] = await db.execute(
        'INSERT INTO servicios (nombreServicio, precio) VALUES (?, ?)',
        [newServicio.nombreServicio, newServicio.precio]
    );
    return { idServicio: result.insertId, ...newServicio };
};

exports.update = async (idServicio, updatedServicio) => {
    const [result] = await db.execute(
        'UPDATE servicios SET nombreServicio = ?, precio = ?  WHERE idServicio = ?',
        [updatedServicio.nombreServicio, updatedServicio.precio, idServicio]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idServicio) => {
    const [result] = await db.execute('DELETE FROM servicios WHERE idServicio = ?', [idServicio]);
    return result.affectedRows > 0;
};