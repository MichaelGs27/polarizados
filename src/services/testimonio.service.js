const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM testimonios');
    return rows;
};

exports.findById = async (idTestimonio) => {
    const [rows] = await db.execute('SELECT * FROM testimonios WHERE idTestimonio = ?', [idTestimonio]);
    return rows[0];
};

exports.create = async (newTestimonio) => {
    const [result] = await db.execute(
        'INSERT INTO testimonios (comentario, fecha) VALUES (?, ?)',
        [newTestimonio.comentario, newTestimonio.fecha]
    );
    return { idTestimonio: result.insertId, ...newTestimonio };
};

exports.update = async (idTestimonio, updatedTestimonio) => {
    const [result] = await db.execute(
        'UPDATE testimonios SET comentario = ?, fecha = ?  WHERE idTestimonio = ?',
        [updatedTestimonio.comentario, updatedTestimonio.fecha, idTestimonio]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idTestimonio) => {
    const [result] = await db.execute('DELETE FROM testimonios WHERE idTestimonio = ?', [idTestimonio]);
    return result.affectedRows > 0;
};