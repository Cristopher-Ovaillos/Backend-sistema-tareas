const router = require('express').Router();
const controller = require('../controllers/usuariosController');
const auth = require('../middlewares/auth');
const soloAdmin = require('../middlewares/role')('administrador');


router.post('/login', controller.login); 
//se verifica los header de la peeticion, si no cumple no avanza de aca
router.use(auth);

//rutas protegidas
router.get('/', soloAdmin, controller.getAll);
router.get('/:id', soloAdmin, controller.getById);
router.post('/', soloAdmin, controller.create);

module.exports = router;

/*
//esto es antiguo, ignorar
const router = require('express').Router();
const controller = require('../controllers/usuariosController');
const auth = require('../middlewares/auth');
//require('../role') trae el cod. 
//Al poner ('administrador') al lado, se pasa ese texto como dato, puedes pasarle mas con ('a','b')
const soloAdmin = require('../middlewares/role')('administrador');//configurara para que solo se busque administador


//middleware de nivel de router, entonces se ejecuta siempre para cualquier ruta de aca
//extraemos el header del usuario.
router.use(auth);

// SOLO ADMIN gestiona usuarios
router.get('/', soloAdmin, controller.getAll);
router.get('/:id', soloAdmin, controller.getById);
router.post('/', soloAdmin, controller.create);

module.exports = router;
*/