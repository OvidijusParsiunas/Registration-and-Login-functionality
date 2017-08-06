var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var sendMail = require('./mail.js');
var TempUser = require('./database/models/tempUser.js');
var User = require('./database/models/user.js');
//var mongoose = require('mongoose');
//var TempUser = mongoose.model('TempUser')
//var User = mongoose.model('User')
var encryption = require('./encryption.js');
var token = require('./token.js');

module.exports = function(app) {

    app.get('/', function (req, res) {
        displayForm(res);
    })

    app.post('/', function (req, res) {
        sendEmail(req, res);
    })

    app.get('/verifyNewAccount', function (req, res) {
      if(req.query.token)
      {
          TempUser.findOne({token: req.query.token}, function(err, doc) {
            if(doc)
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
              })
            }
          })



    app.get('/login', function (req, res) {
        displayLogin(res);
    })

    app.post('/authenticateUser', function (req, res) {
        authenticateUser(req, res);
    })

    function displayForm(res) {
        fs.readFile('form.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                    'Content-Length': data.length
            });
            res.write(data);
            res.end();
        });
    }

    function displayLogin(res) {
        fs.readFile('login.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                    'Content-Length': data.length
            });
            res.write(data);
            res.end();
        });
    }

    function sendEmail(req, res){
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

    function authenticateUser(req, res) {
        var fields = new Object();
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields) {
            //Store the data from the fields in your data store.
            //The data store could be a file or database or any other store based
            //on your application.
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            var otherMaterials = {name: 'hello'}
            //res.write('received the data:\n\n');
            // if(another.authenticateUser(fields.email, fields.password, function(response) {
            //   console.log('The response is: ' + response)
            // }))
            var user = new User({
                email: fields.email,
              });
            User.findOne({email: fields.email}, function(err, doc) {
                    if(doc){
                      if(encryption.checkPassword(fields.password, doc.password)){
                        console.log('Successfull')
                      }
                      else{
                        console.log('Password was incorrect')
                      }}
                      else {
                        console.log('Email was not found')
              }}
            )

            //console.log(returnedVariable)
            console.log('The email is ' + fields.email + ' the password is ' + fields.password)
            res.end(util.inspect({
                fields: fields,
                otherMaterials: otherMaterials
            }));
        });
    }
}
