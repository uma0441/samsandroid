var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
    SALT_WORK_FACTOR = 10;

// Define schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,  
        required: true,
       },
       password: {
        type: String,
        trim: true,
        required: true
       },
       type:{
           type : Number,
           required :true
       }
},{timestamps: true});

// hash user password before saving into database
UserSchema.pre('save', function(next){
    console.log({pwd:this.password});
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    console.log(this.password);
    next();
    });

// Compile model from schema
var UserModel = mongoose.model('users', UserSchema );
module.exports = UserModel;