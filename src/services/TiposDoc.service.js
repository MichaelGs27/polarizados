const db = require('../config/db.config');

// Obtiene todos los registros de la tabla TiposDoc
exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM tiposDoc');
    return rows;
};

// Obtiene un registro por su Id
exports.findByIdTipoDoc = async (idTipoDoc) => {
    const [rows] = await db.execute('SELECT * FROM TiposDoc WHERE idTipoDoc = ?', [idTipoDoc]);
    return rows[0];
};

// Crea un nuevo registro en la tabla TiposDoc
// Incluye idTipoDoc en la consulta y en los parámetros.
exports.create = async (newTipoDoc) => {
     const [result] = await db.execute(
        'INSERT INTO TiposDoc (idTipoDoc, descripcion) VALUES (?, ?)',
        [newTipoDoc.idTipoDoc, newTipoDoc.descripcion]
    );
    return newTipoDoc;
};

// Actualiza un registro existente por su Id
exports.update = async (idTipoDoc, updatedTipoDoc) => {
    const [result] = await db.execute(
        'UPDATE TiposDoc SET descripcion = ? WHERE idTipoDoc = ?',
        [updatedTipoDoc.descripcion, idTipoDoc]
    );
    return result.affectedRows > 0;
};

// Elimina un registro por su Id
exports.remove = async (idTipoDoc) => {
    const [result] = await db.execute('DELETE FROM TiposDoc WHERE idTipoDoc = ?', [idTipoDoc]);
    return result.affectedRows > 0;
};