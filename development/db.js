const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_NAME = 'sistema.db';
const dbPath = path.join(__dirname, '..', DB_NAME);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Conectado a:", DB_NAME);
        definir_tablas();
    }
});

// Funcion para crear las tablas si no existen e insertar datos semilla
function definir_tablas() {
    db.serialize(() => {

        db.run("PRAGMA foreign_keys = ON;");

        // 1. Crear tabla usuarios
        db.run(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                rol TEXT NOT NULL CHECK (rol IN ('administrador', 'estandar'))
            )
        `);

        // CORRECCIÓN AQUÍ: Usamos INSERT OR IGNORE
        // Esto evita el error si los usuarios ya existen
        db.run(`
            INSERT OR IGNORE INTO usuarios (nombre, email, rol) 
            VALUES 
                ('Usuario 1', 'user1@test.com', 'administrador'),
                ('Usuario 2', 'user2@test.com', 'estandar'),
                ('Usuario 3', 'user3@test.com', 'estandar'),
                ('Usuario 4', 'user4@test.com', 'estandar'),
                ('Usuario 5', 'user5@test.com', 'estandar')
        `);

        // 2. Crear tabla tareas
        db.run(`
            CREATE TABLE IF NOT EXISTS tareas (
                id_tarea INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descripcion TEXT,
                estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'en_progreso', 'completada')),
                prioridad TEXT NOT NULL CHECK (prioridad IN ('baja', 'media', 'alta')),
                fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 3. Crear tabla intermedia
        db.run(`
            CREATE TABLE IF NOT EXISTS tareas_usuarios (
                id_tarea INTEGER NOT NULL,
                id_usuario INTEGER NOT NULL,
                confirmado INTEGER NOT NULL DEFAULT 0 CHECK (confirmado IN (0, 1)),
                PRIMARY KEY (id_tarea, id_usuario),
                FOREIGN KEY (id_tarea) REFERENCES tareas (id_tarea) ON DELETE CASCADE,
                FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE
            )
        `, (err) => {
            if (err) console.error("Error al finalizar el DDL:", err.message);
            else console.log("Estructura de base de datos verificada/creada.");
        });

    });
}

module.exports = db;