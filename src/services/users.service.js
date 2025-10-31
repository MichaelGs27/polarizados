const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');

class UserService {
    constructor() {
        this.connection = mysql.createPool(config.db);
    }

    async findByEmail(email) {
        const [rows] = await this.connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }
    async create(userData) {
        const {firstName, lastName, email, phone, address, idDocumentType, documentNumber, password} = userData;
        // cons = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        const [result] = await this.connection.execute(
            'INSERT INTO users (firstName, lastName, email, phone, address, idDocumentType, documentNumber, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, phone, address, idDocumentType, documentNumber, password]
        );
        
        return {
            idUser: result.insertId,
            firstName,
            lastName,
            email,
            phone,
            address,
            idDocumentType,
            documentNumber,
            password
            
        };
    }

    async getProfile(userId) {
        const [rows] = await this.connection.execute(
            'SELECT firstName, email FROM users WHERE idUser = ?',
            [userId]
        );
        return rows[0];
    }

    async getPublicProfile(userId) {
        const [rows] = await this.connection.execute(
            'SELECT firstName FROM users WHERE idUser = ?',
            [userId]
        );
        return rows[0];
    }

    async update(userId, userData) {
        const {firstName, lastName, email, phone, address, idDocumentType, documentNumber, password } = userData;
        await this.connection.execute(
            'UPDATE users SET firstName = ?, lastName = ?, email = ?,phone=?, address = ?, idDocumentType = ?, documentNumber = ?,password = ? WHERE idUser = ?',
            [firstName, lastName, email, phone, address, idDocumentType, documentNumber, password, userId]
        );
        return this.getProfile(userId);
    }

    async delete(userId) {
        await this.connection.execute(
            'DELETE FROM users WHERE idUser = ?',
            [userId]
        );
        return true;
    }

    async changepassword(userId, oldpassword, newpassword) {
        const [user] = await this.connection.execute(
            'SELECT password FROM users WHERE idUser = ?',
            [userId]
        );

        if (!user[0] || !bcrypt.compareSync(oldpassword, user[0].password)) {
            throw new Error('Contraseña actual incorrecta');
        }

        const hashedcontraseña = bcrypt.hashSync(newpassword, 10);
        await this.connection.execute(
            'UPDATE users SET password = ? WHERE idUser = ?',
            [hashedcontraseña, userId]
        );
        return true;
    }

    async getDashboard(userId) {
        // Aquí puedes agregar lógica específica del dashboard
        const [usuarioInfo] = await this.connection.execute(
            'SELECT  firstName, email FROM users WHERE idUser = ?',
            [userId]
        );
        return {
            user: usuarioInfo[0],
            // Agrega más datos según necesites
        };
    }
}

module.exports = UserService;