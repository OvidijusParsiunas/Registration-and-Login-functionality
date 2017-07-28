var bcrypt = require('bcrypt');
const saltRounds = 10;
var encryption = require('./encrypt.js');
//var another = require('./database.js');
var password2 = 'mydogsname'
var password  = encryption(password2);
var password3 = 'asdhuagf'
var found = bcrypt.compareSync(password3, password); // true

console.log(found);
//another.insert(password);

// var results = another.find(req.query.token, function(err, data){
// password
// var password  = encryption(password2);
// var found = bcrypt.compareSync(password2, password); // true
// console.log(found)
