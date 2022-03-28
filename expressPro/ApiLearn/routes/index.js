var express = require('express');
var router = express.Router();

// var dbConfig = require('../util/dbconfig.js')
var cate = require('../controllers/dbtableController')
/* GET home page. */
router.get('/', cate.getCate);
router.get('/getPostCate',cate.getPostCate)

module.exports = router;
