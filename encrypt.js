var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(text) {
  return bcrypt.hashSync(text, saltRounds);
}

// var myPlaintextPassword = 'password'
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//       console.log('salt: ' + salt)
//       console.log('hash: ' + hash)
//     });
// });
// var password2 = 'mydogsname'
// var found = bcrypt.compareSync(password2, text); // true
// console.log(found)
//
// var password3 = 'mydogsname'
// var found2 = bcrypt.compareSync(password3, text); // true
// console.log(found2)
//
// var bcrypt2 = require('bcrypt');
// var found3 = bcrypt2.compareSync(password3, text); // true
// console.log(found3)
