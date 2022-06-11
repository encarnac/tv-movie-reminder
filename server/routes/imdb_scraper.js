var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const title = req.query.title;
  const category = req.query.category
  
  res.render('index', { title: 'Express' });
});

module.exports = router;
