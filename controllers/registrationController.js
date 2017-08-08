var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var sendMail = require('../mail.js');
var TempUser = require('../database/models/tempUser.js');
var User = require('../database/models/user.js');
//var mongoose = require('mongoose');
//var TempUser = mongoose.model('TempUser')
//var User = mongoose.model('User')
var encryption = require('../encryption.js');
var token = require('../token.js');

exports.displayForm = function(req, res) {
    fs.readFile('./views/form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
              'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

exports.sendEmail = function(req, res){
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields) {
  res.writeHead(200, {
      'content-type': 'text/plain'
  });
  res.write('Sent successfully:\n\n');
  //console.log(fields.email);

  var encryptedPassword = encryption.encryptPassword(fields.password);
  var accountVerificationToken = token.crypto2();

  var temporaryUser = new TempUser({
    accountHolderName: fields.accountHolderName,
    email: fields.email,
    password: encryptedPassword,
    token: accountVerificationToken,
    });

      temporaryUser.save(function (err) {
        if (err) {
              var error = 'Something bad happened, try again!';
              console.log('Something bad happened, try again!');
              if(err.code === 11000) {
                error = 'That email is already taken, try another.';
              }
            }
          console.log("Token Saved");// saved!
      });
  sendMail.sendEmail(fields.email, accountVerificationToken);
  res.end(util.inspect({
      fields: fields
  }));
});
}

exports.verifyNewAccount = function (req, res) {
  if(req.query.token)
  {
      TempUser.findOne({token: req.query.token}, function(err, doc) {
        if (err) return handleError(err);
        if(doc)
        {
          var user = new User({
            accountHolderName: doc.accountHolderName,
            email: doc.email,
            password: doc.password
          })
          user.save(function(err, small) {
            if (err) return handleError(err);
              console.log("New user added to the system with the name of " + doc.accountHolderName);
                TempUser.remove({token: req.query.token}, function (err) {
                  if (err) return handleError(err);
                  console.log('removed ' + req.query.token);
            })})
          }else{(console.log('Token not found'))}})
        }
      }
