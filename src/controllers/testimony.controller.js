const testimonyService = require('../services/testimony.service');

exports.findAll = async (req, res) => {
    try {
        const testimonios = await testimonyService.findAll();
        res.status(200).json(testimonios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener testimonios", error });
    }
};

exports.findById = async (req, res) => {
    try {
        const testimony = await testimonyService.findById(req.params.id);
        if (!testimony) {
            return res.status(404).json({ message: "Testimonio no encontrado" });
        }
        res.status(200).json(testimony);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener testimony", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newservicio = await testimonyService.create(req.body);
        res.status(201).json(newservicio);
    } catch (error) {
        res.status(500).json({ message: "Error al crear testimony", error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updated = await testimonyService.update(req.params.id, req.body);
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
        const removed = await testimonyService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "Testimonio no encontrado" });
        }
        res.status(200).json({ message: "Testimonio eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar Testimonio", error });
    }
};