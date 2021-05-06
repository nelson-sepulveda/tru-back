var mongoose = require('mongoose'), Schema = mongoose.Schema;

var alcanciaSchema = new Schema({
	autor: { type: Schema.ObjectId, ref: "Autor" },
	tipo: { type: String },
  	total: { type: Number }
});

module.exports = mongoose.model('alcancias', alcanciaSchema);