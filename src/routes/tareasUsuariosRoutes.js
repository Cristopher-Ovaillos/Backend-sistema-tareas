const router = require('express').Router();
const controller = require('../controllers/tareasUsuariosController');
const auth = require('../middlewares/auth');
const soloAdmin = require('../middlewares/role')('administrador');

router.use(auth);

// ADMIN asigna
router.post('/asignar', soloAdmin, controller.asignar);

// ADMIN ELIMINA
// Usamos HTTP DELETE
router.delete('/desasignar', soloAdmin, controller.desasignar);

// USUARIO confirma
router.post('/confirmar', controller.confirmar);

// USUARIO ve
router.get('/usuario/:idUsuario', controller.tareasPorUsuario);

module.exports = router;