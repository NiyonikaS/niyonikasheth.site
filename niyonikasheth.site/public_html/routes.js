const express = require('express'),
router = express.Router();

// get user lists
router.get('/api/browsers', function(req, res) {
  let sql = `SELECT * FROM initialBrowserData`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Browser info retrieved successfully"
    })
  })
});

// create new user
router.post('/api/browsers', function(req, res) {
  let sql = `INSERT INTO users(cookiesEnabled, innerHeight, innerWidth, language, outerHeight, outerWidth, userAgent) VALUES (?)`;
  let values = [
    req.body.cookiesEnabled,
    req.body.innerHeight, 
    req.body.innerWidth, 
    req.body.language, 
    req.body.outerHeight, 
    req.body.outerWidth, 
    req.body.userAgent
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New data added successfully"
    })
  })
});

module.exports = router;

// {
//     "/api/browsers" : "/browsers",
//     "/api/navigation" : "/navigation"
// }

