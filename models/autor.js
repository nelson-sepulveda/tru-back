var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var autorSchema = new Schema({
	nombre: { type: String },
	email: { type: String },
	password: { type: String }
});


module.exports = mongoose.model('autor', autorSchema);