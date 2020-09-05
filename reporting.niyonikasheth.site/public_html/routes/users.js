// routes/users.js

var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

/* GET user profile. 
TODO: change to get all users */ 
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;