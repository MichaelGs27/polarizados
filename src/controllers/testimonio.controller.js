const testimonioService = require('../services/testimonio.service');

exports.findAll = async (req, res) => {
    try {
        const testimonios = await testimonioService.findAll();
        res.status(200).json(testimonios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener testimonios", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const testimonio = await testimonioService.findById(req.params.id);
        if (!testimonio) {
            return res.status(404).json({ message: "Testimonio no encontrado" });
        }
        res.status(200).json(testimonio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener testimonio", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newservicio = await testimonioService.create(req.body);
        res.status(201).json(newservicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear testimonio", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await testimonioService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Testimonio no encontrado" });
        }
        res.status(200).json({ message: "Testimonio actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar Testimonio", error });
    }
};

exports.remove = async (req, res) => {
    try {
        const removed = await testimonioService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Testimonio no encontrado" });
        }
        res.status(200).json({ message: "Testimonio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Testimonio", error });
    }
};