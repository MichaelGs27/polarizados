const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('../config/db.config');

class PortafolioService {
    constructor() {
        this.connection = mysql.createPool(config.db);
    }

    async findByEmail(email) {
        const [rows] = await this.connection.execute(
            'SELECT * FROM portafolio WHERE email = ?',
            [email]
        );
        return rows[0];
    }
    async create(userData) {
        const {promotionName, description} = userData;
        // cons = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        const [result] = await this.connection.execute(
            'INSERT INTO portafolio (promotionName, description) VALUES (?, ?)',
            [promotionName, description ]
        );
        
        return {
            idPortafolio: result.insertId,
            promotionName,
            description,
         
            
        };
    }

    async getProfile(portafolioId) {
        const [rows] = await this.connection.execute(
            'SELECT promotionName, description FROM portafolio WHERE idPortafolio = ?',
            [portafolioId]
        );
        return rows[0];
    }

    async getPublicProfile(portafolioId) {
        const [rows] = await this.connection.execute(
            'SELECT promotionName FROM portafolio WHERE idPortafolio = ?',
            [portafolioId]
        );
        return rows[0];
    }

    async update(portafolioId, userData) {
        const {promotionName, description } = userData;
        await this.connection.execute(
            'UPDATE portafolio SET promotionName = ?, description = ? WHERE idPortafolio = ?',
            [promotionName, description ]
        );
        return this.getProfile(portafolioId);
    }

    async delete(portafolioId) {
        await this.connection.execute(
            'DELETE FROM portafolio WHERE idPortafolio = ?',
            [portafolioId]
        );
        return true;
    }

    
    async getDashboard(idUsuario) {
        // Aquí puedes agregar lógica específica del dashboard
        const [portafolioInfo] = await this.connection.execute(
            'SELECT  * FROM portafolio WHERE idUsuario = ?',
            [idUsuario]
        );
        return {
            usuario: portafolioInfo[0],
            // Agrega más datos según necesites
        };
    }
}

module.exports =PortafolioService;