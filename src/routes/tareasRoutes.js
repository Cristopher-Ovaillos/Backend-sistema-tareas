const router = require('express').Router();
const controller = require('../controllers/tareasController');
const auth = require('../middlewares/auth');
const soloAdmin = require('../middlewares/role')('administrador');
const perteneceATarea = require('../middlewares/perteneceTarea');

router.use(auth);

// ADMIN: ve todas
router.get('/', soloAdmin, controller.getAll);

// ADMIN o ASIGNADO
router.get('/:id', perteneceATarea, controller.getById);

// SOLO ADMIN crea tareas
router.post('/', soloAdmin, controller.create);

module.exports = router;
