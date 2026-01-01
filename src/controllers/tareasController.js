const TareasService = require('../services/tareasService');

const TareasController = {

    getAll: async (req, res) => {
        const tareas = await TareasService.listarTodas();
        res.json(tareas);
    },

    getById: async (req, res) => {
        const tarea = await TareasService.buscarPorId(req.params.id);
        if (!tarea) return res.status(404).json({ error: 'No encontrada' });
        res.json(tarea);
    },

    create: async (req, res) => {
        const nueva = await TareasService.crear(req.body);
        res.status(201).json(nueva);
    }
};

module.exports = TareasController;
