const db = require('../../development/db'); 

const TareasUsuariosRepository = {

    asignar(idTarea, idUsuario) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO tareas_usuarios (id_tarea, id_usuario, confirmado)
                 VALUES (?, ?, 0)`,
                [idTarea, idUsuario],
                function (err) {
                    if (err) reject(err);
                    else resolve({ id_tarea: idTarea, id_usuario: idUsuario });
                }
            );
        });
    },

    confirmar(idTarea, idUsuario) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE tareas_usuarios
                 SET confirmado = 1
                 WHERE id_tarea = ? AND id_usuario = ?`,
                [idTarea, idUsuario],
                function (err) {
                    if (err) reject(err);
                    else resolve({ confirmed: this.changes === 1 });
                }
            );
        });
    },
    eliminar(idTarea, idUsuario) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM tareas_usuarios WHERE id_tarea = ? AND id_usuario = ?`,
                [idTarea, idUsuario],
                function (err) {
                    if (err) reject(err);
                    // this.changes > 0 significa que borro algo
                    else resolve({ eliminado: this.changes > 0 });
                }
            );
        });
    },

    tareasPorUsuario(idUsuario) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT t.*, tu.confirmado,
                (
                    SELECT GROUP_CONCAT(u2.nombre, ', ')
                    FROM tareas_usuarios tu2
                    JOIN usuarios u2 ON tu2.id_usuario = u2.id_usuario
                    WHERE tu2.id_tarea = t.id_tarea
                ) as participantes
                FROM tareas t
                JOIN tareas_usuarios tu ON t.id_tarea = tu.id_tarea
                WHERE tu.id_usuario = ?
            `;

            db.all(sql, [idUsuario], (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });
    }
};

module.exports = TareasUsuariosRepository;