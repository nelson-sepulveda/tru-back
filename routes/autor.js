var express = require("express");
const AutorController = require("../controllers/autorController");

var router = express.Router();

router.post("/", AutorController.autorCreate);
router.post("/login", AutorController.login);

module.exports = router;