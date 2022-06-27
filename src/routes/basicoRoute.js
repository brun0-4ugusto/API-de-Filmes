const { Router } = require("express");
const router = Router();
const BasicoController = require("../controllers/BasicoController");

router.post("/filme/comentario", BasicoController.postarComentario);
router.post("/filme/comentarios/:id", BasicoController.responderComentario)

module.exports = router;
