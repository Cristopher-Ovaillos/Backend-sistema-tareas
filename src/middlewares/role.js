module.exports = (rolPermitido) => {
    return (req, res, next) => {
        if (req.user.rol !== rolPermitido) {
            return res.status(403).json({ error: 'Acceso denegado' });
        }
        next();
    };
};
