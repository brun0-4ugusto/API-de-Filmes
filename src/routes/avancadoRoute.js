const { Router } = require("express");
const router = Router();
const AvancadoController = require("../controllers/AvancadoController")

router.post("/filme/:id", AvancadoController.curtir)

module.exports = router