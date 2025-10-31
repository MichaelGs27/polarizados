const promocionService = require('../services/promotions.service');

exports.findAll = async (req, res) => {
    try {
        const promociones = await promocionService.findAll();
        res.status(200).json(promociones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener promociones", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const promocion = await promocionService.findById(req.params.id);
        if (!promocion) {
            return res.status(404).json({ message: "Promocion no encontrado" });
        }
        res.status(200).json(promocion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener promocion", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newpromocion = await promocionService.create(req.body);
        res.status(201).json(newpromocion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear promocion", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await promocionService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Promocion no encontrado" });
        }
        res.status(200).json({ message: "Promocion actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Promocion", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await promocionService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Promocion no encontrado" });
        }
        res.status(200).json({ message: "Promocion eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Promocion", error });
    }
};