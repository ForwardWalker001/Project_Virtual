var express = require('express');
var router = express.Router();

var userTable = require('../controllers/dbtableController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login',userTable.login)

module.exports = router;
