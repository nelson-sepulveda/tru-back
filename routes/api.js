var express = require("express");
var task = require("./task");
var autor = require("./autor");
var fondo = require('./fondo')
var alcancia = require('./alcancia')

var app = express();

app.use("/task/", task);
app.use("/autor/", autor);
app.use("/fondo/", fondo);
app.use("/alcancia/", alcancia);

module.exports = app;