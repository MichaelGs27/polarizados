const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM promotions');
    return rows;
};

exports.findById = async (idPromotion) => {
    const [rows] = await db.execute('SELECT * FROM promotions WHERE idPromotion = ?', [idPromotion]);
    return rows[0];
};

exports.create = async (newPromotion) => {
    const [result] = await db.execute(
        'INSERT INTO promotions (promotionName, promotionPrice, startDate, endDate, status, discount) VALUES (?, ?, ?, ?, ?, ?)',
        [newPromotion.promotionName, newPromotion.promotionPrice, newPromotion.startDate, newPromotion.endDate, newPromotion.status, newPromotion.discount]
    );
    return { idPromotion: result.insertId, ...newPromotion };
};

exports.update = async (idPromotion, updatedPromocion) => {
    const [result] = await db.execute(
        'UPDATE promotions SET promotionName = ?, promotionPrice = ? , startDate = ?, endDate = ?, status = ?, discount = ? WHERE idPromotion = ?',
        [updatedPromocion.promotionName, updatedPromocion.promotionPrice, updatedPromocion.startDate, updatedPromocion.endDate, updatedPromocion.status, updatedPromocion.discount, idPromotion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idPromotion) => {
    const [result] = await db.execute('DELETE FROM promotions WHERE idPromotion = ?', [idPromotion]);
    return result.affectedRows > 0;
};