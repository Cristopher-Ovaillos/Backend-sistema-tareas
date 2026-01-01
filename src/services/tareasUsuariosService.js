const TareasUsuariosRepository = require('../repositories/tareasUsuariosRepository');
const UsuariosRepository = require('../repositories/usuariosRepository'); 
const TareasService = require('./tareasService'); // usamos service de tareas

const TareasUsuariosService = {

    asignarUsuario: async (id_tarea, id_usuario) => {
        const usuario = await UsuariosRepository.findById(id_usuario);
        if (!usuario) throw new Error("Usuario no existe");
        if (usuario.rol === 'administrador') throw new Error("No puedes asignar tareas a un Admin");

        return await TareasUsuariosRepository.asignar(id_tarea, id_usuario);
    },

    listarTareasPorUsuario: async (id_usuario) => {
        return await TareasUsuariosRepository.tareasPorUsuario(id_usuario);
    },

    confirmarTarea: async (id_tarea, id_usuario) => {
        await TareasUsuariosRepository.confirmar(id_tarea, id_usuario);
        return await TareasService.verificarYCompletar(id_tarea);
    },
    desasignarUsuario: async (id_tarea, id_usuario)=> {
        return await TareasUsuariosRepository.eliminar(id_tarea, id_usuario);
    },
};

module.exports = TareasUsuariosService;