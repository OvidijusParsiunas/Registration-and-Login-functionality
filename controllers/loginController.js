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

exports.displayLogin = function(req, res) {
    fs.readFile('./views/login.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

exports.authenticateUser = function(req, res) {
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
