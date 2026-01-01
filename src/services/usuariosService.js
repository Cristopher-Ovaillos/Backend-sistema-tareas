const UsuariosRepository = require('../repositories/usuariosRepository');

const UsuariosService = {

    listarTodos() {
        return UsuariosRepository.findAll();
    },

    buscarPorId(id) {
        return UsuariosRepository.findById(id);
    },

    crear(usuario) {
        if (!usuario.nombre || !usuario.email || !usuario.rol) {
            throw new Error('Datos de usuario incompletos');
        }
        return UsuariosRepository.create(usuario);
    }
};

module.exports = UsuariosService;
