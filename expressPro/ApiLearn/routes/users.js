var express = require('express');
var router = express.Router();
var user = require('../controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sendCode', user.sendCode)
router.post('/codePhoneLogin', user.codePhoneLogin)

module.exports = router;
