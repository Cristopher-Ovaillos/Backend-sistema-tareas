const db = require('../../development/db'); 

module.exports = (req, res, next) => {

    const idUsuario = req.headers['x-user-id'];

    if (!idUsuario) {
        return res.status(401).json({ error: 'No autenticado: Falta ID' });
    }

    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    db.get(sql, [idUsuario], (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno de autenticación' });
        }

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no existe' });
        }

        req.user = {
            id_usuario: usuario.id_usuario,
            rol: usuario.rol 
        };

        next();
    });
};