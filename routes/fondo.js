var express = require("express");
const FondoController = require("../controllers/fondoController");

var router = express.Router();

router.post("/", FondoController.fondoCreate);

module.exports = router;