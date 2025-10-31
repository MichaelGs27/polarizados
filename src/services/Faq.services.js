// src/services/faq.service.js

const db = require('../config/db.config');

// Obtiene todas las questions frecuentes
exports.findAll = async () => {
    const [rows] = await db.execute('SELECT * FROM faqs');
    return rows;
};

// Obtiene una question frecuente por su ID
exports.findByidFAQ = async (idFAQ) => {
    const [rows] = await db.execute('SELECT * FROM faqs WHERE idFAQ = ?', [idFAQ]);
    return rows[0];
};

// Crea una nueva question frecuente
exports.create = async (newFaq) => {
    const [result] = await db.execute(
        'INSERT INTO faqs (question, answer, idService) VALUES (?, ?, ?)',
        [newFaq.question, newFaq.answer, newFaq.idService] 
    );
    return { idFAQ: result.insertId, ...newFaq };
};

// Actualiza una question frecuente existente
exports.update = async (idFAQ, updatedFaq) => {
    const [result] = await db.execute(
        'UPDATE faqs SET question = ?, answer = ?, idService = ? WHERE idFAQ = ?',
        [updatedFaq.question, updatedFaq.answer, updatedFaq.idService, idFAQ]
    );
    return result.affectedRows > 0;
};

// Elimina una question frecuente
exports.remove = async (idFAQ) => {
    const [result] = await db.execute('DELETE FROM faqs WHERE idFAQ = ?', [idFAQ]);
    return result.affectedRows > 0;
};