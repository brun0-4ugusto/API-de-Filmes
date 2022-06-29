const { Router } = require("express");
const LeitorController = require("../controllers/LeitorController");
const router = Router();
const passport = require('passport')
const middlewares = require('../middlewares/middlewaresAutenticacao')

router.get("/filme/",[middlewares.bearer, middlewares.verificaCargo(middlewares.Leitor)], LeitorController.buscarInteracoes);
router.post("/filme/nota", [middlewares.bearer, middlewares.verificaCargo(middlewares.Leitor)],LeitorController.darNota);

module.exports = router;