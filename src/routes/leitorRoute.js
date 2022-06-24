const { Router } = require("express");
const LeitorController = require("../controllers/LeitorController");
const router = Router();

router.get("/filme/", LeitorController.buscarFilmes);
router.post("/filme/nota", LeitorController.darNota);

module.exports = router;