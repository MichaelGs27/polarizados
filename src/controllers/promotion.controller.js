const promotionService = require('../services/promotion.service');

exports.findAll = async (req, res) => {
    try {
        const promotions = await promotionService.findAll();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener promotions", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const promotion = await promotionService.findById(req.params.id);
        if (!promotion) {
            return res.status(404).json({ message: "promotion no encontrado" });
        }
        res.status(200).json(promotion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener promotion", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newpromotion = await promotionService.create(req.body);
        res.status(201).json(newpromotion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear promotion", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await promotionService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "promotion no encontrado" });
        }
        res.status(200).json({ message: "promotion actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar promotion", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await promotionService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "promotion no encontrado" });
        }
        res.status(200).json({ message: "promotion eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar promotion", error });
    }
};