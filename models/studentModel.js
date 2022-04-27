var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentSchema = new Schema({
	'userid' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'users'
	},
	'class' : {
		type: Schema.Types.ObjectId,
		ref: 'class'
   }
},{ timestamps: true });

module.exports = mongoose.model('student', studentSchema);
