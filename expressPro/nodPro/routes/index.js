var express = require('express');
var router = express.Router();

var userTable = require('../controllers/dbtableController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',userTable.login)
router.post('/register', userTable.register)
router.get('/scoreSearch', userTable.scoreSearch)
router.get('/changScore', userTable.changScore)
router.get('/allScore', userTable.allScore)
router.get('/scoreContent', userTable.scoreContent)
module.exports = router;
