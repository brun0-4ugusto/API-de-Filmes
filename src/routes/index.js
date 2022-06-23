const bodyParser = require("body-parser");
const app = require("..");
const usuario = require("./usuariosRoute");

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(usuario);
    app.get("/", (req, res) => {
        res.send("Olá");
    });
};
