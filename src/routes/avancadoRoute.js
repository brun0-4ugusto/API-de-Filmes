const { Router } = require("express");
const router = Router();
const AvancadoController = require("../controllers/AvancadoController")
const passport = require('passport')
const middlewares = require('../middlewares/middlewaresAutenticacao')

router.post("/filme/:id",[middlewares.bearer, middlewares.verificaCargo(middlewares.Avancado)], AvancadoController.curtir)

module.exports = router