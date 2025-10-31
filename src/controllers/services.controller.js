const servicioService = require('../services/services.service');

exports.findAll = async (req, res) => {
    try {
        const servicios = await servicioService.findAll();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener servicios", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const servicio = await servicioService.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.status(200).json(servicio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener servicio", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newservicio = await servicioService.create(req.body);
        res.status(201).json(newservicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear servicio", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await servicioService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.status(200).json({ message: "Servicio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Servicio", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await servicioService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.status(200).json({ message: "Servicio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Servicio", error });
    }
};