const db = require('../config/db.config');

// Obtiene todos los registros de la tabla documenttypes
exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM documenttypes');
    return rows;
};

// Obtiene un registro por su Id
exports.findById = async (idDocumentType) => {
    const [rows] = await db.execute('SELECT * FROM documenttypes WHERE idDocumentType = ?', [idDocumentType]);
    return rows[0];
};

exports.create = async (newDocumentType) => {
     const [result] = await db.execute(
        'INSERT INTO documenttypes (idDocumentType, description) VALUES (?, ?)',
        [newDocumentType.idDocumentType, newDocumentType.description]
    );
    return newDocumentType;
};

// Actualiza un registro existente por su Id
exports.update = async (idDocumentType, updatedDocumentType) => {
    const [result] = await db.execute(
        'UPDATE documenttypes SET description = ? WHERE idDocumentType = ?',
        [updatedDocumentType.description, idDocumentType]
    );
    return result.affectedRows > 0;
};

// Elimina un registro por su Id
exports.remove = async (idDocumentType) => {
    const [result] = await db.execute('DELETE FROM documenttypes WHERE idDocumentType = ?', [idDocumentType]);
    return result.affectedRows > 0;
};