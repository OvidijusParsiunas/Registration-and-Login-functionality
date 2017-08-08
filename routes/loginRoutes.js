var express = require('express')
var router = express.Router()

var login_controller = require('../controllers/loginController.js');

    router.get('/', login_controller.displayLogin);

    router.post('/authenticateUser', login_controller.authenticateUser);

module.exports = router;
