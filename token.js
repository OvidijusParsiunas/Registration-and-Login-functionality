var crypto = require('crypto').randomBytes(48, function(ex, buf) {
    token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-')
});

//another way of executing the above 'crypto' fuction
var crypto2 = require('crypto');
crypto2 = crypto2.randomBytes(48);
crypto2 =  crypto2.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');

// var crypto3 = require('crypto').randomBytes(48, function(err, buffer) {
//   var token = buffer.toString('hex');
// });

exports.crypto2 = function() {
  var crypto2 = require('crypto');
  crypto2 = crypto2.randomBytes(48);
  crypto2 =  crypto2.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
  return crypto2;
};
