var mongoose = require('mongoose'), Schema = mongoose.Schema;

var envioSchema = new Schema({
	autor: { type: Schema.ObjectId, ref: "Autor" },
  fondo: { type: Schema.ObjectId, ref: "Fondo" },
  alcancia: { type: Schema.ObjectId, ref: "Alcancia" },
  monto: { type: Number }
});

module.exports = mongoose.model('envio', envioSchema);