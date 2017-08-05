var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var sendMail = require('./mail.js');
var another = require('./database.js');

module.exports = function(app) {

    app.get('/', function (req, res) {
        displayForm(res);
    })

    app.post('/', function (req, res) {
        sendEmail(req, res);
    })

    app.get('/verify', function (req, res) {
      if(req.query.token)
      {
        var results = another.validateTempUser(req.query.token, function(err, data){
          if(data == null)
          {
            console.log('Not found');
          }
          else{
            console.log(data.token);
          }
        }
    )}
    })

    app.get('/login', function (req, res) {
        displayLogin(res);
    })

    app.post('/submit', function (req, res) {
        processAllFieldsOfTheForm(req, res);
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
      console.log(fields.email);
      sendMail.sendEmail(fields.accountHolderName, fields.email, fields.password, fields.email);
      res.end(util.inspect({
          fields: fields
      }));
    });
    }

    function processAllFieldsOfTheForm(req, res) {
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
            res.write('received the data:\n\n');
            if(another.authenticateUser(fields.email, fields.password, function(response) {
              console.log('The response is: ' + response)
            }))
            console.log(returnedVariable)
            console.log('The email is ' + fields.email + ' the password is ' + fields.password)
            res.end(util.inspect({
                fields: fields,
                otherMaterials: otherMaterials
            }));
        });
    }
}
