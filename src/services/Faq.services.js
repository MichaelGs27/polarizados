// src/services/faq.service.js

const db = require('../config/db.config');

// Obtiene todas las preguntas frecuentes
exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM faq');
    return rows;
};

// Obtiene una pregunta frecuente por su ID
exports.findByIdFaq = async (idFaq) => {
    const [rows] = await db.execute('SELECT * FROM faq WHERE idFaq = ?', [idFaq]);
    return rows[0];
};

// Crea una nueva pregunta frecuente
exports.create = async (newFaq) => {
    const [result] = await db.execute(
        'INSERT INTO faq (pregunta, respuesta, idServicio) VALUES (?, ?, ?)',
        [newFaq.pregunta, newFaq.respuesta, newFaq.idServicio] 
    );
    return { idFAQ: result.insertId, ...newFaq };
};

// Actualiza una pregunta frecuente existente
exports.update = async (idFaq, updatedFaq) => {
    const [result] = await db.execute(
        'UPDATE faq SET pregunta = ?, respuesta = ?, idServicio = ? WHERE idFAQ = ?',
        [updatedFaq.pregunta, updatedFaq.respuesta, updatedFaq.idServicio, idFaq]
    );
    return result.affectedRows > 0;
};

// Elimina una pregunta frecuente
exports.remove = async (idFaq) => {
    const [result] = await db.execute('DELETE FROM faq WHERE idFaq = ?', [idFaq]);
    return result.affectedRows > 0;
};