var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to SAMS' });
}); 

//router.get('/', (req, res) => res.send('Welcome to SAMS'))

router.get('/api',function(req, res, next) {
res.send({"key":"value"})
});

module.exports = router;

