const { Router } = require("express");
const LeitorController = require("../controllers/LeitorController");
const router = Router();

router.get("/filmes/", LeitorController.buscarFilmes);

module.exports = router;