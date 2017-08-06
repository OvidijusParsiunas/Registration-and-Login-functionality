var mongoose = require('mongoose');

//const { mongoose } = require('../database.js')

// Mongoose Schema definition
var Schema = mongoose.Schema;

var TempUserSchema = new Schema({
  accountHolderName: String,
  email: {type: String, unique : true, dropDups: true},
  password: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 3600}
}, {collection: 'tempUserExperimentalExperiment'})

// var TempUserModel = mongoose.model('tempUserExperimentalExperiment', TempUserSchema);
// exports.UserModel = UserModel;
module.exports = mongoose.model('TempUser', TempUserSchema)
