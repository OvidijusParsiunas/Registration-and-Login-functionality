var http = require('http');
var routes = require('./routing.js');
const db = require('./database/database.js')
const express = require('express')
const app = express()

app.listen(1185, function () {
  console.log('App listening on port 1185!')
})

routes(app);


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
