//Expess needed?
var express = require('express');
var encryption = require('./encryption.js');

// Mongoose import
var mongoose = require('mongoose');

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost/test6', function (error) {
    if (error) {
        console.log(error);
    }
});

// Mongoose Schema definition
var Schema = mongoose.Schema;
var TempUserSchema = new Schema({
  accountHolderName: String,
  email: String,
  password: String,
  token: String,
  createdAt: { type: Date, default: Date.now, expires: 3600}
}, {collection: 'tempUserExperimentalExperiment'})

var UserSchema = new Schema({
  accountHolderName: String,
  email: String,
  password: String
}, {collection: 'UserExperimental'})

// Mongoose Model definition
var TempUserModel = mongoose.model('tempUserExperimentalExperiment', TempUserSchema);
var UserModel = mongoose.model('UserExperimental', UserSchema);


var queries = {

  insertTempUser: function(nameParam, emailParam, passwordParam, tokenParam){
    var encryptedPassword = encryption.encryptPassword(passwordParam);
    TempUserModel.create({accountHolderName: nameParam, email: emailParam, password: encryptedPassword, token: tokenParam}, function (err, small) {
      if (err) return handleError(err);
        console.log("Token Saved");// saved!
    });
  },
  validateTempUser: function(tokenParam, cb){
    TempUserModel.findOne({ token: tokenParam}, cb).exec(
      function(err, doc) {
        if(doc){
          UserModel.create({accountHolderName: doc.accountHolderName, email: doc.email, password: doc.password}, function (err, small) {
            if (err) return handleError(err);
              console.log("New user added to the system");
          });
        }
        else{
          console.log('Not found here');
        }
    });
  },
  removeTempUser: function(tokenParam){
    TempUserModel.remove({token: tokenParam}, function (err) {
      if (err) return handleError(err);
        console.log('removed ' + tokenParam);
    })
  },

  authenticateUser: function(emailParam, passwordParam, cb){
    UserModel.findOne({ email: emailParam}, cb).exec(
      function(err, doc) {
        if(doc){
          var passwordMatch = encryption.checkPassword(passwordParam, doc.password)
          if(passwordMatch){
            console.log('PasswordsMatch')
          }
          else{
            console.log('Passwords do not match')
          }}
        else{
          console.log('Email not found')
        }
        })
  }
}

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
