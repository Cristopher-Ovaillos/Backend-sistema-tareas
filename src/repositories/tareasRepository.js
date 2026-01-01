const db = require('../../development/db');

const TareasRepository = {

    findAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM tareas`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM tareas WHERE id_tarea = ?`, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    create({ titulo, descripcion, prioridad }) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO tareas (titulo, descripcion, estado, prioridad)
                 VALUES (?, ?, 'pendiente', ?)`,
                [titulo, descripcion, prioridad],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id_tarea: this.lastID, titulo, descripcion, estado: 'pendiente', prioridad });
                }
            );
        });
    },

    verificarYActualizarEstado(idTarea) {
        return new Promise((resolve, reject) => {
            // ningún usuario en esta tarea que tenga confirmado = 0"
            const sql = `
                UPDATE tareas
                SET estado = 'completada'
                WHERE id_tarea = ?
                AND NOT EXISTS (
                    SELECT 1 
                    FROM tareas_usuarios 
                    WHERE id_tarea = ? AND confirmado = 0
                )
            `;
            
            db.run(sql, [idTarea, idTarea], function (err) {
                if (err) reject(err);
                // this.changes sera 1 si la tarea se completo, 0 si todavía falta gente
                else resolve({ tareaCompletada: this.changes > 0 });
            });
        });
    }
};

module.exports = TareasRepository;