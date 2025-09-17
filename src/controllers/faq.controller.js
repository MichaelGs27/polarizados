
const FaqService = require('../services/Faq.services.js');

exports.findAll = async (req, res) => {
    try {
        const Faqs = await FaqService.findAll();
        res.status(200).json(Faqs);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la pregunta", error });
    }
};

exports.findById = async (req, res) => {
    try {
        // CORRECCIÓN: La función en el servicio se llama `findByIdFaq`
        const faq = await FaqService.findByIdFaq(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la pregunta", error });
    }
};

exports.create = async (req, res) => {
    try {
        const newfaq = await FaqService.create(req.body);
        res.status(201).json(newfaq);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la pregunta", error });
    }
};

exports.update = async (req, res) => {
    try {
        // CORRECCIÓN: La función en el servicio se llama `updateFaq`
        const updated = await FaqService.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "pregunta no encontrada" });
        }
        res.status(200).json({ message: "pregunta actualizada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la pregunta", error });
    }
};

exports.remove = async (req, res) => {
    try {
        // CORRECCIÓN: La función en el servicio se llama `removeFaq`
        const removed = await FaqService.remove(req.params.id);
        if (!removed) {
            return res.status(404).json({ message: "pregunta no encontrada" });
        }
        res.status(200).json({ message: "pregunta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la pregunta", error });
    }
};