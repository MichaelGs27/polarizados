const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM testimonies');
    return rows;
};

exports.findById = async (idTestimony) => {
    const [rows] = await db.execute('SELECT * FROM testimonies WHERE idTestimony = ?', [idTestimony]);
    return rows[0];
};

exports.create = async (newTestimony) => {
    const [result] = await db.execute(
        'INSERT INTO testimonies (comment, idUser, idService, date) VALUES (?, ?, ?, ?)',
        [newTestimony.comment, newTestimony.idUser, newTestimony.idService, newTestimony.date]
    );
    return { idTestimony: result.insertId, ...newTestimony };
};

exports.update = async (idTestimony, updatedTestimony) => {
    const [result] = await db.execute(
        'UPDATE testimonies SET comment  idUser, idService,= ?, date = ?  WHERE idTestimony = ?',
        [updatedTestimony.comment, updatedTestimony.idUser, updatedTestimony.idService, updatedTestimony.date, idTestimony]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idTestimony) => {
    const [result] = await db.execute('DELETE FROM testimonies WHERE idTestimony = ?', [idTestimony]);
    return result.affectedRows > 0;
};