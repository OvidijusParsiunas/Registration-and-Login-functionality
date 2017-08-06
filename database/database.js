// Mongoose import
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Declare the db connection explicitly to prevent the "Deprecation Warning" error durimng startup using the following example:
//http://blog.blairvanderhoof.com/post/37309147906/why-arent-my-models-returning-from-their-queries

// Mongoose connection to MongoDB (ted/ted is readonly)
mongoose.connect('mongodb://localhost/test6', function (error) {
    if (error) {
        console.log(error);
    }
});







//module.exports = { mongoose }

// var queries = {
//   insertTempUser: function(nameParam, emailParam, passwordParam, tokenParam){
//     var encryptedPassword = encryption.encryptPassword(passwordParam);
//     TempUserModel.create({accountHolderName: nameParam, email: emailParam, password: encryptedPassword, token: tokenParam}, function (err, small) {
//       if (err) {
//             var error = 'Something bad happened, try again!';
//             console.log('Something bad happened, try again!');
//             if(err.code === 11000) {
//               error = 'That email is already taken, try another.';
//             }
//           }
//         console.log("Token Saved");// saved!
//     });
//   },
//   validateTempUser: function(tokenParam, cb){
//     TempUserModel.findOne({ token: tokenParam}, cb).exec(
//       function(err, doc) {
//         if(doc){
//           UserModel.create({accountHolderName: doc.accountHolderName, email: doc.email, password: doc.password}, function (err, small) {
//           if (err) return handleError(err);
//             console.log("New user added to the system with the name of " + doc.accountHolderName);
//             TempUserModel.remove({token: tokenParam}, function (err) {
//             if (err) return handleError(err);
//               console.log('removed ' + tokenParam);
//             })
//           });
//         }
//         else{
//           console.log('Not found here');
//         }
//     });
//   },
//   removeTempUser: function(tokenParam){
//     TempUserModel.remove({token: tokenParam}, function (err) {
//       if (err) return handleError(err);
//         console.log('removed ' + tokenParam);
//     })
//   },
//
//   authenticateUser: function(emailParam, passwordParam, cb){
//     UserModel.findOne({ email: emailParam}).exec(
//       function(err, doc) {
//         if(doc){
//           if(encryption.checkPassword(passwordParam, doc.password)){
//             return cb('Successfull')
//           }
//           else {
//             return cb('Password is incorrect')
//           }}
//         else{
//               return cb('Your email is incorrect')
//         }
//         })
//   }
// }
//
// module.exports = queries;







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
