const bodyParser = require("body-parser");
const app = require("..");
const usuario = require("./usuariosRoute");
const leitor = require("./leitorRoute");
const basico = require("./basicoRoute");
const avancado = require("./avancadoRoute")
const moderador = require("./moderadorRoute")
const EstrategiasAutenticacao = require('../autenticacao/autenticacao')
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require("../swagger.json")

module.exports = (app) => {
    app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs))
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

