const bodyParser = require("body-parser");
const app = require("..");
const usuario = require("./usuariosRoute");
const leitor = require("./leitorRoute");
const basico = require("./basicoRoute");
const avancado = require("./avancadoRoute")
const moderador = require("./moderadorRoute")
const EstrategiasAutenticacao = require('../autenticacao/autenticacao')

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        usuario,
        leitor,
        basico,
        avancado,
        moderador
    );

    app.get("/", (req, res) => {
        res.send("Olá");
    });
};

