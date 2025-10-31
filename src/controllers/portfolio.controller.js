const portafolioService = require('../services/portfolio.service');

exports.getAllPortfolio = async (req, res) => {
    try {
        const Portafolio = await portafolioService.getAllPortfolio();
        res.status(200).json(Portafolio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener Portafolio", error });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const portafolio = await portafolioService.getPortfolioById(req.params.id);
        if (!portafolio) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json(portafolio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener portafolio", error });
    }
};

exports.createPortfolio = async (req, res) => {
    try {
        const newservicio = await portafolioService.createPortfolio(req.body);
        res.status(201).json(newservicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear portafolio", error: error.message });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const updated = await portafolioService.updatePortfolio(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json({ message: "Portafolio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Portafolio", error });
    }
};

exports.removePortfolio = async (req, res) => {
    try {
        const removed = await portafolioService.removePortfolio(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Portafolio no encontrado" });
        }
        res.status(200).json({ message: "Portafolio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Portafolio", error });
    }
};