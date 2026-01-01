const db = require('../../development/db');

const UsuariosRepository = {

    findAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM usuarios WHERE id_usuario = ?`,
                [id],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    },

    create({ nombre, email, rol }) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO usuarios (nombre, email, rol)
                 VALUES (?, ?, ?)`,
                [nombre, email, rol],
                function (err) {
                    if (err) reject(err);
                    resolve({ id_usuario: this.lastID, nombre, email, rol });
                }
            );
        });
    }
};

module.exports = UsuariosRepository;
