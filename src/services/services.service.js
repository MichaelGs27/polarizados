const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM services');
    return rows;
};

exports.findById = async (idService) => {
    const [rows] = await db.execute('SELECT * FROM services WHERE idService = ?', [idService]);
    return rows[0];
};

exports.create = async (newServicio) => {
    const [result] = await db.execute(
        'INSERT INTO services (serviceName, price) VALUES (?, ?)',
        [newServicio.serviceName, newServicio.price]
    );
    return { idService: result.insertId, ...newServicio };
};

exports.update = async (idService, updatedServicio) => {
    const [result] = await db.execute(
        'UPDATE services SET serviceName = ?, price = ?  WHERE idService = ?',
        [updatedServicio.serviceName, updatedServicio.price, idService]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idService) => {
    const [result] = await db.execute('DELETE FROM services WHERE idService = ?', [idService]);
    return result.affectedRows > 0;
};