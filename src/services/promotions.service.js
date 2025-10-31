const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM promotions');
    return rows;
};

exports.findById = async (idPromotion) => {
    const [rows] = await db.execute('SELECT * FROM promotions WHERE idPromotion = ?', [idPromotion]);
    return rows[0];
};

exports.create = async (newpromotion) => {
    const [result] = await db.execute(
        'INSERT INTO promotions (idServiceType, promotionName, promotionPrice, startDate, endDate, status, discount, idService) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [newpromotion.idServiceType, newpromotion.promotionName, newpromotion.promotionPrice, newpromotion.startDate, newpromotion.endDate, newpromotion.status, newpromotion.discount, newpromotion.idService]
    );
    return { idPromotion: result.insertId, ...newpromotion };
};

exports.update = async (idPromotion, updatedpromotion) => {
    const [result] = await db.execute(
        'UPDATE promotions SET idServiceType = ?, promotionName = ? , promotionPrice = ?, startDate = ?, endDate = ?, status, discount, idService = ? WHERE idPromotion = ?',
        [updatedpromotion.idServiceType, updatedpromotion.promotionName, updatedpromotion.promotionPrice, updatedpromotion.startDate, updatedpromotion.endDate, updatedpromotion.status, updatedpromotion.discount, updatedpromotion.idService, idPromotion]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idPromotion) => {
    const [result] = await db.execute('DELETE FROM promotions WHERE idPromotion = ?', [idPromotion]);
    return result.affectedRows > 0;
};