// src/controllers/documenttypes.controller.js

const documenttypesService = require('../services/documenttypes.service');

// Obtener todos los documenttypes
exports.findAll = async (req, res) => {
    try {
        const documenttypes = await documenttypesService.findAll();
        res.status(200).json(documenttypes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener documenttypes", error });
    }
};

// Obtener un TipoDoc por su ID
exports.findById = async (req, res) => {
    try {
        // CORRECCIÓN: Usar el nombre de la función correcta del servicio
        const tipoDoc = await documenttypesService.findById(req.params.id);
        if (!tipoDoc) {
            // CORRECCIÓN: Mensaje específico para documenttypes
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
        const newTipoDoc = await documenttypesService.create(req.body);
        res.status(201).json(newTipoDoc);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tipo de documento", error });
    }
};

// Actualizar un TipoDoc existente
exports.update = async (req, res) => {
    try {
        const updated = await documenttypesService.update(req.params.id, req.body);
        if (!updated) {
            // CORRECCIÓN: Mensaje específico para documenttypes
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
        const removed = await documenttypesService.remove(req.params.id);
        if (!removed) {
            // CORRECCIÓN: Mensaje específico para documenttypes
            return res.status(404).json({ message: "Tipo de documento no encontrado" });
        }
        res.status(200).json({ message: "Tipo de documento eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tipo de documento", error });
    }
};