var mongoose = require('mongoose'), Schema = mongoose.Schema;

var fondoSchema = new Schema({
	autor: { type: Schema.ObjectId, ref: "Autor" },
	alcancia: { type: Schema.ObjectId, ref: "Alcancia" },
	tipo: { type: String },
	monto: { type: Number },
	fecha: { type: Date }
});

module.exports = mongoose.model('fondos', fondoSchema);