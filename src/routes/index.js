const bodyParser = require("body-parser");
const app = require("..");

module.exports = (app) => {
    app.use(bodyParser.json());
    app.get("/", (req, res) => {
        res.send("Olá");
    });
};
