const TareasRepository = require('../repositories/tareasRepository');

const TareasService = {

    listarTodas: async () => {
        return await TareasRepository.findAll();
    },

    crear: async (datos) => {
        if (!datos.titulo || !datos.prioridad) {
            throw new Error('Título y prioridad requeridos');
        }
        return await TareasRepository.create(datos);
    },

    verificarYCompletar: async (idTarea) => {
        return await TareasRepository.verificarYActualizarEstado(idTarea);
    }
};

module.exports = TareasService;