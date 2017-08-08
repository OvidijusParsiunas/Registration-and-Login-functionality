var express = require('express')
var router = express.Router()

// Require controller modules
var login_controller = require('../controllers/registrationController.js');

    router.get('/', login_controller.displayForm);

    router.post('/', login_controller.sendEmail);

    router.get('/verifyNewAccount', login_controller.verifyNewAccount);

module.exports = router;
