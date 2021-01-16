var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("type = "+req.session.user_type)
  res.render('index', { name: req.session.name ,type:req.session.user_type });
});

module.exports = router;
