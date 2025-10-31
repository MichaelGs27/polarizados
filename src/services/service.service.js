const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM services');
    return rows;
};

exports.findById = async (idService) => {
    const [rows] = await db.execute('SELECT * FROM services WHERE idService = ?', [idService]);
    return rows[0];
};

exports.create = async (newService) => {
    const [result] = await db.execute(
        'INSERT INTO services (nameService, price) VALUES (?, ?)',
        [newService.nameService, newService.price]
    );
    return { idService: result.insertId, ...newService };
};

exports.update = async (idService, updatedService) => {
    const [result] = await db.execute(
        'UPDATE services SET nameService = ?, price = ?  WHERE idService = ?',
        [updatedService.nameService, updatedService.price, idService]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idService) => {
    const [result] = await db.execute('DELETE FROM services WHERE idService = ?', [idService]);
    return result.affectedRows > 0;
};