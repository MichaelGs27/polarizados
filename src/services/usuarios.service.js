const db = require('../config/db.config');

exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
};

exports.findByIdUsuario = async (idUsuario) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
    return rows[0];
};

exports.create = async (newUsuario) => {
    const [result] = await db.execute(
        'INSERT INTO usuarios (nombre, apellido, correo, telefono, direccion, idTipoDoc, numeroDoc) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            newUsuario.nombre, newUsuario.apellido, newUsuario.correo, newUsuario.telefono, newUsuario.direccion, newUsuario.idTipoDoc, newUsuario.numeroDoc,
        ]
    );
    return { idUsuario: result.insertId, ...newUsuario };
};

exports.update = async (idUsuario, updatedUsuario) => {
    const [result] = await db.execute(
        'UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, idTipoDoc = ?, numeroDoc = ? WHERE idUsuario = ?',
        [updatedUsuario.nombre, updatedUsuario.correo, idUsuario]
    );
    return result.affectedRows > 0;
};

exports.remove = async (idUsuario) => {
    const [result] = await db.execute('DELETE FROM usuario WHERE idUsuario = ?', [idUsuario]);
    return result.affectedRows > 0;
};