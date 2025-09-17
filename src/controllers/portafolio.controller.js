const portafolioService = require('../services/portafolio.service');

exports.findAll = async (req, res) => {
    try {
        const Portafolio = await portafolioService.findAll();
        res.status(200).json(Portafolio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener Portafolio", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const portafolio = await portafolioService.findById(req.params.id);
        if (!portafolio) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json(portafolio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener portafolio", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newservicio = await portafolioService.create(req.body);
        res.status(201).json(newservicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear portafolio", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await portafolioService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json({ message: "Portafolio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Portafolio", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await portafolioService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json({ message: "Portafolio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Portafolio", error });
    }
};