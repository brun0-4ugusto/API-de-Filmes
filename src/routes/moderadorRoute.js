const { Router } = require("express");
const router = Router();
const ModeradorController = require("../controllers/ModeradorController")

router.post("/moderador",ModeradorController.darMod)
router.delete("/filme/comentarios/:id", ModeradorController.excluirComentario)
router.put("/filme/comentarios/:id",ModeradorController.marcarRepetido)

module.exports = router