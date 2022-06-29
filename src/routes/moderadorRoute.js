const { Router } = require("express");
const router = Router();
const ModeradorController = require("../controllers/ModeradorController")
const passport = require('passport')
const middlewares = require('../middlewares/middlewaresAutenticacao')

router.post("/moderador",[middlewares.bearer, middlewares.verificaCargo(middlewares.Moderador)],ModeradorController.darMod)
router.delete("/filme/comentarios/:id",[middlewares.bearer, middlewares.verificaCargo(middlewares.Moderador)], ModeradorController.excluirComentario)
router.put("/filme/comentarios/:id",[middlewares.bearer, middlewares.verificaCargo(middlewares.Moderador)],ModeradorController.marcarRepetido)

module.exports = router