var bcrypt = require('bcrypt');
const saltRounds = 10;

var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
