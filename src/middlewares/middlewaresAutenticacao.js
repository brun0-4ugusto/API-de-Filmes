const passport = require("passport");

module.exports = {
    bearer: (req, res, next) => {
        passport.authenticate("bearer", { session: false }, (erro, usuario, info) => {
            if (erro && erro.name === "JsonWebTokenError") {
                return res.status(401).json({ erro: erro.message });
            }
            if (erro && erro.name === "TokenExpiredError") {
                return res.status(401).json({
                    erro: erro.message,
                    expiradoEm: erro.expiredAt,
                });
            }

            if (erro) {
                return res.status(500).json({ erro: erro.message });
            }
            if (!usuario) {
                return res.status(401).json();
            }
            req.user = usuario;
            return next();
        })(req, res, next);
    },

    verificaCargo: (cargosObrigatorios) => (req, res, next) => {
        if (cargosObrigatorios.indexOf(req.user.dataValues.funcao) === -1) {
            res.status(403).json({erro:"Não tem permissões suficientes"}).end();
            return;
        }
        next();
    },

    Leitor: ["Leitor","Basico","Avancado","Moderador"],
    Basico: ["Basico","Avancado","Moderador"],
    Avancado: ["Avancado","Moderador"],
    Moderador: ["Moderador"],
};
