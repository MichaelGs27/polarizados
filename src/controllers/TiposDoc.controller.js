// src/controllers/TiposDoc.controller.js

const TiposDocService = require('../services/TiposDoc.service');

// Obtener todos los TiposDoc
exports.findAll = async (req, res) => {
    try {
        const tiposDoc = await TiposDocService.findAll();
        res.status(200).json(tiposDoc);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener TiposDoc", error });
    }
};

// Obtener un TipoDoc por su ID
exports.findById = async (req, res) => {
    try {
        // CORRECCIÓN: Usar el nombre de la función correcta del servicio
        const tipoDoc = await TiposDocService.findByIdTipoDoc(req.params.id);
        if (!tipoDoc) {
            // CORRECCIÓN: Mensaje específico para TiposDoc
            return res.status(404).json({ message: "Tipo de documento no encontrado" });
        }
        res.status(200).json(tipoDoc);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo de documento", error });
    }
};

// Crear un nuevo TipoDoc
exports.create = async (req, res) => {
    try {
        const newTipoDoc = await TiposDocService.create(req.body);
        res.status(201).json(newTipoDoc);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tipo de documento", error });
    }
};

// Actualizar un TipoDoc existente
exports.update = async (req, res) => {
    try {
        const updated = await TiposDocService.update(req.params.id, req.body);
        if (!updated) {
            // CORRECCIÓN: Mensaje específico para TiposDoc
            return res.status(404).json({ message: "Tipo de documento no encontrado" });
        }
        res.status(200).json({ message: "Tipo de documento actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tipo de documento", error });
    }
};

// Eliminar un TipoDoc
exports.remove = async (req, res) => {
    try {
        const removed = await TiposDocService.remove(req.params.id);
        if (!removed) {
            // CORRECCIÓN: Mensaje específico para TiposDoc
            return res.status(404).json({ message: "Tipo de documento no encontrado" });
        }
        res.status(200).json({ message: "Tipo de documento eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo de documento", error });
    }
};