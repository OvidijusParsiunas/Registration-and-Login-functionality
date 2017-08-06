var mongoose = require('mongoose');

//const { mongoose } = require('../database.js')

// Mongoose Schema definition
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  accountHolderName: String,
  email: String,
  password: String
}, {collection: 'UserExperimental'})

// var UserModel = mongoose.model('UserExperimental', UserSchema);
// exports.UserModel = UserModel;
module.exports = mongoose.model('User', UserSchema)
