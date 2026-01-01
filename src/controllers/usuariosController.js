const UsuariosService = require('../services/usuariosService');

const UsuariosController = {

    // adicional
    login: async (req, res) => {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Debes enviar un ID' });
        }

        try {
            // reutilizamos el servicio existente buscarPorId
            const usuario = await UsuariosService.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado. Revise el ID.' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAll: async (req, res) => {
        const usuarios = await UsuariosService.listarTodos();
        res.json(usuarios);
    },

    getById: async (req, res) => {
        const usuario = await UsuariosService.buscarPorId(req.params.id);
        if (!usuario) return res.status(404).json({ error: 'No encontrado' });
        res.json(usuario);
    },

    create: async (req, res) => {
        try {
            const nuevo = await UsuariosService.crear(req.body);
            res.status(201).json(nuevo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = UsuariosController;