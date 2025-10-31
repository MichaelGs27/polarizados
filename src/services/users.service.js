const db = require('../config/db.config');
const bcrypt = require('bcrypt'); 
const SALT_ROUNDS = 10; 

// Obtención de todos los users
exports.findAll = async () => {
    const [rows] = await db.execute('SELECT idUser, firstName, lastName, email, phone, address, idDocumentType, documentNumber FROM users');
    return rows;
};

// Obtener usuario por ID
exports.findByidUser = async (idUser) => {
    // Se elimina 'role' del SELECT
    const [rows] = await db.execute('SELECT idUser, firstName, lastName, email, phone, address, idDocumentType, documentNumber, password FROM users WHERE idUser = ?', [idUser]);
    return rows[0];
};

// Funcion para encontrar usuario por email (para login)
exports.findByEmail = async (email) => {
    const [rows] = await db.execute('SELECT idUser, firstName, lastName, email, password FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Creación de nuevo usuario con contraseña hasheada    
exports.create = async (newUsuario) => {
    // 1. Hashear la contraseña antes de insertarla
    if (!newUsuario.password) {
        throw new Error("La contraseña es obligatoria para el registro.");
    }
    const hashedpassword = await bcrypt.hash(newUsuario.password, SALT_ROUNDS);

    // FUNCIÓN DE AYUDA: Asegura que undefined se convierta a null
    const checkUndefined = (value) => value !== undefined ? value : null;
    
    // 2. Ejecutar la inserción:
    const [result] = await db.execute(
        'INSERT INTO users (firstName, lastName, email, phone, address, idDocumentType, documentNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
            checkUndefined(newUsuario.firstName), 
            checkUndefined(newUsuario.lastName), 
            checkUndefined(newUsuario.email), 
            checkUndefined(newUsuario.phone), 
            checkUndefined(newUsuario.address), 
            checkUndefined(newUsuario.idDocumentType), 
            checkUndefined(newUsuario.documentNumber),
            hashedpassword 
        ]
    );
    // Excluir la contraseña del objeto retornado
    const { password, ...userData } = newUsuario;
    return { idUser: result.insertId, ...userData };
};

// Actualización de usuario con opción de cambiar contraseña
exports.update = async (idUser, updatedUsuario) => {
    let passwordHash = updatedUsuario.password;
    let queryParams = [updatedUsuario.firstName, updatedUsuario.lastName, updatedUsuario.email, updatedUsuario.phone, updatedUsuario.address, updatedUsuario.idDocumentType, updatedUsuario.documentNumber];
    let query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ?, idDocumentType = ?, documentNumber = ?';
    // Si se proporciona una nueva contraseña, hashearla y agregarla a la consulta
    if (updatedUsuario.password) {
        passwordHash = await bcrypt.hash(updatedUsuario.password, SALT_ROUNDS);
        query += ', password = ?';
        queryParams.push(passwordHash);
    }
    query += ' WHERE idUser = ?';
    queryParams.push(idUser);
    const [result] = await db.execute(query, queryParams);
    return result.affectedRows > 0;
};
// Eliminación de usuario por id
exports.remove = async (idUser) => {
    const [result] = await db.execute('DELETE FROM users WHERE idUser = ?', [idUser]); 
    return result.affectedRows > 0;
};