var express = require('express');
var encryption = require('./encrypt.js');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost/test5', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var TempUserSchema = new Schema({
  username: String,
  password: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 3600}
}, {collection: 'tempUserExperimentalExperiment'})

var UserSchema = new Schema({
  username: String,
  password: String
}, {collection: 'UserExperimental'})

// Mongoose Model definition
var TempUserModel = mongoose.model('tempUserExperimentalExperiment', TempUserSchema);
var UserModel = mongoose.model('UserExperimental', UserSchema);


var queries = {
  insert: function(usernameParam, passwordParam, tokenParam){
    var encryptedPassword = encryption(passwordParam);
    TempUserModel.create({username: usernameParam, password: encryptedPassword, token: tokenParam}, function (err, small) {
      if (err) return handleError(err);
        console.log("Token Saved");// saved!
    });
  },
  find: function(tokenParam, cb){
    TempUserModel.findOne({ token: tokenParam}, cb).exec(
      function(err, doc) {
        if(doc){
          UserModel.create({username: doc.username, password: doc.password}, function (err, small) {
            if (err) return handleError(err);
              console.log("New user added to the system");
          });
      }
      else{
        console.log('Not found here');
      }
  });
},
  remove: function(tokenParam){
    TempUserModel.remove({token: tokenParam}, function (err) {
      if (err) return handleError(err);
        console.log('removed ' + tokenParam);
    })
  }}

module.exports = queries;







// Mongoose Schema definition
// var Schema = mongoose.Schema;
// var TempUserSchema = new Schema({
//   username: String,
//   password: String,
//   token: String,
//   createdAt: { type: Date, default: Date.now, expires: 3600}
// }, {collection: 'tempUserExperimentalExperiment'})
//
// var UserSchema = new Schema({
//   username: String,
//   password: String
// }, {collection: 'UserExperimental'})
//
// var PasswordSchema = new Schema({
//   password: String,
//   salt: String
// }, {collection: 'passwords2'})
//
// // Mongoose Model definition
// var TempUserModel = mongoose.model('tempUserExperimentalExperiment', TempUserSchema);
// var UserModel = mongoose.model('UserExperimental', UserSchema);
// var PasswordsModel = mongoose.model('PasswordExperimental2', PasswordSchema);
//
// var queries = {
//   insert: function(passwordParam, saltParam){
//     var encryptedPassword = encryption(passwordParam);
//     PasswordsModel.create({password: passwordParam, salt: saltParam}, function (err, small) {
//       if (err) return handleError(err);
//         console.log("Token Saved");// saved!
//     });
//   },
//   find: function(passwordParam, cb){
//     PasswordsModel.findOne({ password: passwordParam}, cb).exec(
//       function(err, doc) {
//         console.log('Found the document: ' + doc);
//         });
// },
//   remove: function(tokenParam){
//     TempUserModel.remove({token: tokenParam}, function (err) {
//       if (err) return handleError(err);
//         console.log('removed ' + tokenParam);
//     })
//   }}
//
// module.exports = queries;
