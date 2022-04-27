var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var subjectSchema = new Schema({
	'name' : String,
	'description' : String
},{ timestamps: true });

module.exports = mongoose.model('subject', subjectSchema);
