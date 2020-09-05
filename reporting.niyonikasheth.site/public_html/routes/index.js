// routes/index.js

var express = require('express');
var secured = require('../lib/middleware/secured');
var router = express.Router();

/* GET home page. */
router.get('/', secured(), function (req, res, next) {
//   res.render('index', { title: 'Auth0 Webapp sample Nodejs' });
    const { _raw, _json, ...userProfile } = req.user;
    process.env.LOGGED_IN_USER = JSON.stringify(userProfile);
    res.sendFile('/var/www/reporting.niyonikasheth.site/public_html/index.html', {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: 'Index'
    });
});


module.exports = router;