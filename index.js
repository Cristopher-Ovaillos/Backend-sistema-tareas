const express = require('express');
const app = express();
const cors = require('cors')

// Importar config
const config = require('./development/config');
// rutas
const usuariosRoutes = require('./src/routes/usuariosRoutes');
const tareasRoutes = require('./src/routes/tareasRoutes');
const tareasUsuariosRoutes = require('./src/routes/tareasUsuariosRoutes');
// midleware json
app.use(cors())
app.use(express.json());
//use ruta
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/tareas-usuarios', tareasUsuariosRoutes);

const PORT = config.port; 

app.get('/favicon.ico', (req, res) => res.status(204).end());//daba problema en la consola
app.get('/api', (req, res) => {
    res.json({ status: 'up', message: 'server listo' });
});

app.listen(PORT, () => {
    console.log(`${config.url}`);
        console.log("\n endpoints");
    
    console.log("\n usuarios");
    console.log("GET    /api/usuarios");
    console.log("GET    /api/usuarios/:id");
    console.log("POST   /api/usuarios");

    console.log("\n tareas");
    console.log("GET    /api/tareas           (admin)");
    console.log("GET    /api/tareas/:id       (admin o asignado)");
    console.log("POST   /api/tareas           (admin)");

    console.log("\n asignaciones / colaboracion");
    console.log("POST   /api/tareas-usuarios/asignar");
    console.log("POST   /api/tareas-usuarios/confirmar");
    console.log("GET    /api/tareas-usuarios/usuario/:idUsuario");
    
    console.log("\n----------------------");
});
