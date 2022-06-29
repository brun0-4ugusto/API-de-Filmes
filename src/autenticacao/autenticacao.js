const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const UsuarioController = require("../controllers/UsuarioController");

module.exports = passport.use(
    new BearerStrategy(async (token, done) => {
        try {
            const payload = jwt.verify(token, "senha-secreta");
            const usuario = await UsuarioController.buscaPorUsuario(payload.email);
            done(null, usuario);
        } catch (error) {
            done(error);
        }
    })
);


