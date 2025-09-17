const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM portafolio');
    return rows;
};

exports.findById = async (idPortafolio) => {
    const [rows] = await db.execute('SELECT * FROM portafolio WHERE idPortafolio = ?', [idPortafolio]);
    return rows[0];
};

exports.create = async (newPortafolio) => {
    const [result] = await db.execute(
        'INSERT INTO portafolio (nombrePromocion, descripcion) VALUES ( ?, ?)',
        [newPortafolio.nombrePromocion, newPortafolio.descripcion]
    );
    return { idPortafolio: result.insertId, ...newPortafolio };
};

exports.update = async (idPortafolio, updatedPortafolio) => {
    const [result] = await db.execute(
        'UPDATE portafolio SET nombrePromocion = ?, descripcion = ?  WHERE idPortafolio = ?',
        [updatedPortafolio.nombrePromocion, updatedPortafolio.descripcion, idPortafolio]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idPortafolio) => {
    const [result] = await db.execute('DELETE FROM portafolio WHERE idPortafolio = ?', [idPortafolio]);
    return result.affectedRows > 0;
};