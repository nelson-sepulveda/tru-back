var express = require("express");
const AlcanciaController = require("../controllers/alcanciaController");

var router = express.Router();

router.post("/", AlcanciaController.alcanciaCreate);
router.get("/:autor", AlcanciaController.alcanciasListar);
router.put("/:id", AlcanciaController.retirarFondos);

module.exports = router;
