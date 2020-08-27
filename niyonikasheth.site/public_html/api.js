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
    host: 'db-apache-latte-do-user-7851590-0.a.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'ct9hdygjhpz0gny9',
    database: 'collectorDataAll',
    port: 25060
    // host: 'localhost',
    // user: 'niyonika',
    // password: 'apachelatte2',
    // database: 'collectorData'
}) 
db.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
});

/***************************** GET  ***************************/

// GET measureName
server.get('/:measureName', function(req, res) {
  let sql = `SELECT * FROM `+req.params.measureName;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
  })
});

// GET measureName id
server.get('/:measureName/:id', function(req, res) {
    let sql = `SELECT * FROM `+req.params.measureName+` WHERE id=`+req.params.id;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.send(data);
    })
  });

/***************************** POST  ***************************/

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

// POST measureName
server.post('/perf/:measureName', function(req, res) {
  let info = {};
  //console.log("recieved: " + req.body.data);
  if (req.body.vitalsScore == null){
    info = {data: req.body.data};
  } else {
    info = {data: req.body.data, vitalsScore:req.body.vitalsScore};
  }
  let sql = `INSERT INTO `+req.params.measureName+` SET ?`;
  let query = db.query(sql, info,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


/***************************** PUT  ***************************/

// PUT measureName
server.put('/perf/:measureName/:id', function(req, res) {
  let sql = `UPDATE `+req.params.measureName+` SET data=`+req.body.data+`, vitalsScore=`+req.body.vitalsScore+
            ` WHERE id=`+req.params.id;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.send(data);
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

/***************************** DELETE  ***************************/


// DELETE measureName
server.delete('/:measureName/:id', function(req, res) {
  let sql = `DELETE FROM `+req.params.measureName+` WHERE id=`+req.params.id;
  db.query(sql, (err, data) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
  });
});

// const router = require('./routes');
// // use modules
// // use router
// server.use('/routes', router);

// server.use(router);

server.listen(3003, () => console.log(`Server started, listening port: 3003`));
