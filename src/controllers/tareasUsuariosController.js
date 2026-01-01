const TareasUsuariosService = require('../services/tareasUsuariosService');

const TareasUsuariosController = {

    asignar: async (req, res) => {

        const { id_tarea, id_usuario } = req.body; 
        
        try {
            const result = await TareasUsuariosService.asignarUsuario(id_tarea, id_usuario);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    confirmar: async (req, res) => {
        const { id_tarea, id_usuario } = req.body;
        try {
            const result = await TareasUsuariosService.confirmarTarea(id_tarea, id_usuario);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    tareasPorUsuario: async (req, res) => {
        try {
            const tareas = await TareasUsuariosService.listarTareasPorUsuario(req.params.idUsuario);
            res.json(tareas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    desasignar: async (req, res) => {
        // usamos DELETE, así que los datos pueden venir en body o query, 
        const { id_tarea, id_usuario } = req.body;
        
        try {
            const result = await TareasUsuariosService.desasignarUsuario(id_tarea, id_usuario);
            if (result.eliminado) {
                res.json({ mensaje: 'Usuario eliminado de la tarea' });
            } else {
                res.status(404).json({ error: 'El usuario no estaba asignado a esta tarea' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = TareasUsuariosController;