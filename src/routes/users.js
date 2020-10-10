const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/registro', function(req, res, next) {
  res.render('register');
});

module.exports = router;
