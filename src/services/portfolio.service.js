const db = require('../config/db.config');

exports.getAllPortfolio = async () => {
    const [rows] = await db.execute('SELECT * FROM portfolio');
    return rows;
};

exports.getPortfolioById = async (idPortfolio) => {
    const [rows] = await db.execute('SELECT * FROM portfolio WHERE idPortfolio = ?', [idPortfolio]);
    return rows[0];
};

exports.createPortfolio = async (newportfolio) => {
    const [result] = await db.execute(
        'INSERT INTO portfolio (idService, idServiceType, promotionName, description, idUser ) VALUES (?, ?, ?, ?, ?)',
        [newportfolio.idService, newportfolio.idServiceType, newportfolio.promotionName, newportfolio.description, newportfolio.idUser]
    );
    return { idPortfolio: result.insertId, ...newportfolio };
};

exports.updatePortfolio = async (idPortfolio, updatedportfolio) => {
    const [result] = await db.execute(
        'UPDATE portfolio SET idService = ?, idServiceType = ? , promotionName = ?, description = ?, idUser = ?,  = ? WHERE idPortfolio = ?',
        [updatedportfolio.idService, updatedportfolio.idServiceType, updatedportfolio.promotionName, updatedportfolio.description, updatedportfolio.idUser, idPortfolio]
    );
    return result.affectedRows > 0;
};

exports.removePortfolio = async (idPortfolio) => {
    const [result] = await db.execute('DELETE FROM portfolio WHERE idPortfolio = ?', [idPortfolio]);
    return result.affectedRows > 0;
};