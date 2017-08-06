var nodemailer = require('nodemailer');
var token = require('./token.js');
var another = require('./database/models/tempUser.js');
var emailAddress;
var currentToken;
// create reusable transporter object using the default SMTP transport

var transporter = nodemailer.createTransport({
  aliases: [
      "Outlook",
      "Outlook.com",
      "Hotmail.com"
  ],
  domains: ["hotmail.com", "outlook.com"],
  host: "smtp.live.com",
  port: 587,
  tls: {
      "ciphers": "SSLv3"
  },
  auth: {
    user: 'oparsiunas@hotmail.com',
    pass: 'Testingpassword123'
  }
});

var textBody = {
  greeting: 'Hello, please click the following link: \n\n'
}
// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'oparsiunas@hotmail.com', // sender address
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plaintext body
};


exports.sendEmail = function(email, accountVerificationToken) {
  //console.log('passed in address: ' + email);
  mailOptions['to'] = email;
  //console.log('The new object is: ' + emailAddress);
  mailOptions['html'] = '<b>Hello world <a href="http://localhost:1185/verifyNewAccount?token=' + accountVerificationToken + '">Visit W3Schools</a>  </b>';
  //console.log('The new token is: ' + accountVerificationToken);
  //console.log(mailOptions.html);
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};
