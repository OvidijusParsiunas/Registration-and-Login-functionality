var http = require('http');
var login = require('./routes/loginRoutes.js');
var registration = require('./routes/registrationRoutes.js');

const db = require('./database/database.js')
const express = require('express')
const app = express()

app.listen(1185, function () {
  console.log('App listening on port 1185!')
})

app.use('/login', login)
app.use('/register', registration)

var address = {
  streetName : 'Gaisrininku',
  streetNumber : '10'
}

var credentials = {
  name: 'Ovidijus Parsiunas',
  adress: {
    streetName : 'asdgdsfdg',
    streetNumber : '10'
  }
}

console.log(credentials)
//console.log(credentials);

credentials.adress['streetNumber'] = 12;

// console.log(credentials);

// console.log("server listening on 1185");
