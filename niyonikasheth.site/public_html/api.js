// api.js file

const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');

server.use(cors());
server.use(bodyParser.json());

// Connect to database
db = mysql.createConnection({
    // host: 'db-apache-latte-do-user-7851590-0.a.db.ondigitalocean.com',
    // user: 'doadmin',
    // password: 'ct9hdygjhpz0gny9',
    // database: 'defaultdb'
    host: 'localhost',
    user: 'niyonika',
    password: 'apachelatte2',
    database: 'collectorData'
}) 
db.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

/***************************** browsers ***************************/
// GET all browsers 
server.get('/browsers', function(req, res) {
    let sql = `SELECT * FROM initialBrowserData`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.send(data);
    })
  });

// GET id browser
  server.get('/browsers/:id', function(req, res) {
    let sql = `SELECT * FROM initialBrowserData WHERE id=`+req.params.id;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.send(data);
    })
  });

// POST browser
server.post('/browsers', function(req, res) {
    let sql = `INSERT INTO initialBrowserData(innerHeight, innerWidth, language, 
      outerHeight, outerWidth, userAgent) VALUES (?)`;
    let values = [
      req.body.innerHeight, 
      req.body.innerWidth, 
      req.body.language, 
      req.body.outerHeight, 
      req.body.outerWidth, 
      req.body.userAgent
    ];
    db.query(sql, [values], function(err, data, fields) {
      if (err) throw err;
      res.json({})
    })
  });

  // PUT browser entry
  server.put('/browsers/:id', function(req, res) {
    let sql = `UPDATE initialBrowserData SET innerHeight=`+req.body.innerHeight+`, innerWidth=`+req.body.innerWidth+
              `, outerHeight=`+req.body.outerHeight+`, outerWidth=`+req.body.outerWidth+`, language=`+req.body.language+
              `, userAgent=`+req.body.userAgent+` WHERE id=`+req.params.id;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.send(data);
    })
  });

  // DELETE browser entry
server.delete('/browsers/:id', function(req, res) {
  let sql = `DELETE FROM initialBrowserData WHERE id=`+req.params.id;
  db.query(sql, (err, data) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
  });
});


/***************************** navtime ***************************/
// GET ALL navigation timing 
server.get('/navtime', function(req, res) {
  let sql = `SELECT * FROM navigationTiming`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// GET id navigation timing
server.get('/navtime/:id', function(req, res) {
  let sql = `SELECT * FROM navigationTiming WHERE id=`+req.params.id;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// POST navigation timing
server.post('/navtime', function(req, res) {
  let data = {time: req.body.time};
  let sql = "INSERT INTO navigationTiming SET ?";
  let query = db.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// PUT navigationTiming entry
server.put('/navtime/:id', function(req, res) {
  let sql = `UPDATE navigationTiming SET time=`+req.body.time+` WHERE id=`+req.params.id;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// DELETE navigationTime entry
server.delete('/navtime/:id', function(req, res) {
let sql = `DELETE FROM navigationTiming WHERE id=`+req.params.id;
db.query(sql, (err, data) => {
  if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
});
});

/***************************** performance ***************************/  
// GET ALL performance 
server.get('/fp', function(req, res) {
  let sql = `SELECT * FROM fp`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});
server.get('/fcp', function(req, res) {
  let sql = `SELECT * FROM fcp`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});
server.get('/fid', function(req, res) {
  let sql = `SELECT * FROM fid`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});
server.get('/lcp', function(req, res) {
  let sql = `SELECT * FROM lcp`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});
server.get('/cls', function(req, res) {
  let sql = `SELECT * FROM cls`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});
server.get('/networkInformation', function(req, res) {
  let sql = `SELECT * FROM networkInformation`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});


// // GET id performance
// server.get('/navtime/:id', function(req, res) {
//   let sql = `SELECT * FROM performance WHERE id=`+req.params.id;
//   db.query(sql, function(err, data, fields) {
//     if (err) throw err;
//     res.send(data);
//   })
// });

// POST performance
server.post('/performance', function(req, res) {
  let data = {data: req.body.data};
  let sql = `INSERT INTO `+req.body.measureName+` SET ?`;
  let query = db.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

server.listen(3003, () => console.log(`Server started, listening port: 3003`));

// const router = require('./routes');
// // use modules
// // use router
// server.use('/routes', router);

// server.use(router);