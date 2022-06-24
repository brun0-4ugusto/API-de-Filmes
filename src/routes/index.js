const bodyParser = require("body-parser");
const app = require("..");
const usuario = require("./usuariosRoute");
const leitor = require("./leitorRoute");

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        usuario,
        leitor
    );

    app.get("/", (req, res) => {
        res.send("Olá");
    });
};
