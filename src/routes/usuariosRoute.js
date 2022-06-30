const { Router } = require("express");
const UsuarioController = require("../controllers/UsuarioController");


const router = Router();

router.post("/usuario", UsuarioController.cadastrarUsuario);
router.post("/usuario/login",UsuarioController.login)


module.exports = router;
