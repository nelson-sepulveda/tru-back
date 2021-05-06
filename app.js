var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');
var apiRoutes = require('./routes/api')
let bodyParser = require('body-parser');
var cors = require("cors");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send("Connected");
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/api/", apiRoutes);
const dbPath = 'mongodb://localhost/trugroup';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
  console.log('connected');
}, error => {
  console.log(error, 'error');
})

server.listen(3000, function() {
  console.log("Servidor arriba en http://localhost:3000");
});