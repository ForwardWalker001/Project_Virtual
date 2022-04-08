var express = require('express');
var router = express.Router();

var userTable = require('../controllers/dbtableController')
var scoreTable = require('../controllers/scoreController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',userTable.login)
router.post('/register', userTable.register)
router.get('/scoreSearch', userTable.scoreSearch)
router.get('/changScore', userTable.changScore)
router.get('/allScore', scoreTable.conditionScore)

module.exports = router;
