const db = require('../../development/db');

module.exports = (req, res, next) => {

    if (req.user.rol === 'administrador') {
        return next();
    }

    const idTarea = req.params.id || req.body.idTarea;
    const idUsuario = req.user.id_usuario;

    const sql = `
        SELECT 1
        FROM tareas_usuarios
        WHERE id_tarea = ? AND id_usuario = ?
    `;

    db.get(sql, [idTarea, idUsuario], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) {
            return res.status(403).json({
                error: 'No está asignado a esta tarea'
            });
        }
        next();
    });
};
