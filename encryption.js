var bcrypt = require('bcrypt');
const saltRounds = 10;

//var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

module.exports = {
  encryptPassword: function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, saltRounds);
  },

  checkPassword: function(plainTextPassword, encryptedPassword) {
    return bcrypt.compareSync(plainTextPassword, encryptedPassword);
  }
};
