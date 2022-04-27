var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var professorSchema = new Schema({
	'userid' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'users'
	},
	'classes' : [{
		type: Schema.Types.ObjectId,
		ref: 'class'
   }]
},{ timestamps: true });

module.exports = mongoose.model('professor', professorSchema);
