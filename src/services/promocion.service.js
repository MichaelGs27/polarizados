const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM promociones');
    return rows;
};

exports.findById = async (idPromocion) => {
    const [rows] = await db.execute('SELECT * FROM promociones WHERE idPromocion = ?', [idPromocion]);
    return rows[0];
};

exports.create = async (newPromocion) => {
    const [result] = await db.execute(
        'INSERT INTO promociones (nombrePromocion, precioPromocion, fechaInicio, fechaFin, estado, descuento) VALUES (?, ?, ?, ?, ?, ?)',
        [newPromocion.nombrePromocion, newPromocion.precioPromocion, newPromocion.fechaInicio, newPromocion.fechaFin, newPromocion.estado, newPromocion.descuento]
    );
    return { idPromocion: result.insertId, ...newPromocion };
};

exports.update = async (idPromocion, updatedPromocion) => {
    const [result] = await db.execute(
        'UPDATE promociones SET nombrePromocion = ?, precioPromocion = ? , fechaInicio = ?, fechaFin = ?, estado = ?, descuento = ? WHERE idPromocion = ?',
        [updatedPromocion.nombrePromocion, updatedPromocion.precioPromocion, updatedPromocion.fechaInicio, updatedPromocion.fechaFin, updatedPromocion.estado, updatedPromocion.descuento, idPromocion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idPromocion) => {
    const [result] = await db.execute('DELETE FROM promociones WHERE idPromocion = ?', [idPromocion]);
    return result.affectedRows > 0;
};