var nodemailer = require('nodemailer');
var token = require('./token.js');
var another = require('./database.js');
var emailAddress;
var currentToken;
// create reusable transporter object using the default SMTP transport

var transporter2 = nodemailer.createTransport({

   aliases: [
           "Google Mail"
       ],
   domains: [
           "gmail.com",
           "googlemail.com"
       ],
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'oparsiunas@gmail.com',
    pass: 'Rikis33893'
  }
});

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

var generateToken = function() {
  currentToken = token.crypto2();
  mailOptions['html'] = '<b>Hello world <a href="http://localhost:1185/verify?token=' + currentToken + '">Visit W3Schools</a>  </b>';
}


exports.sendEmail = function(accountHolderName, email, password, email) {
  console.log('passed in address: ' + email);
  mailOptions['to'] = email;
  console.log('The new object is: ' + emailAddress);
  generateToken();
  console.log('The new token is: ' + currentToken);
  console.log(mailOptions.html);
  another.insertTempUser(accountHolderName, email, password, currentToken);
  // transporter.sendMail(mailOptions, function(error, info){
  //   if(error){
  //     return console.log(error);
  //   }
  //   console.log('Message sent: ' + info.response);
  // });
};
