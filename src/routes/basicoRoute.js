const { Router } = require("express");
const router = Router();
const BasicoController = require("../controllers/BasicoController");
const passport = require('passport')
const middlewares = require('../middlewares/middlewaresAutenticacao')

router.post("/filme/comentario",[middlewares.bearer, middlewares.verificaCargo(middlewares.Basico)], BasicoController.postarComentario);
router.post("/filme/comentarios/:id", [middlewares.bearer, middlewares.verificaCargo(middlewares.Basico)],BasicoController.responderComentario)

module.exports = router;
