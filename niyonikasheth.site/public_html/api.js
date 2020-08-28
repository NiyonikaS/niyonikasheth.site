// api.js file

const express = require('express');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { rewriter } = require('json-server');

server.use(cors());
server.use(bodyParser.json());

// Connect to database
db = mysql.createConnection({
    host: 'db-apache-latte-do-user-7851590-0.a.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'ct9hdygjhpz0gny9',
    database: 'collectorDataAll',
    port: 25060
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
server.post('/object/browsers', function(req, res) {
  let sql = `INSERT INTO initialBrowserData(innerHeight, innerWidth, language, 
    outerHeight, outerWidth, userAgent) VALUES (?)`;
  let data = req.body.data;
  let values = [
    data.innerHeight, 
    data.innerWidth, 
    data.language, 
    data.outerHeight, 
    data.outerWidth, 
    data.userAgent
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": fields}));
  })
});

// POST data consumption
server.post('/object/dataConsumption', function(req, res) {
  let info = req.body.data; /// fixed?
  let sql = `INSERT INTO dataConsumption SET ?`;
  let query = db.query(sql, info,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// POST storageEstimate
server.post('/object/storageEstimate', function(req, res) {
  let info = {"data": JSON.stringify(req.body.data)};
  let sql = `INSERT INTO storageEstimate SET ?`;
  let query = db.query(sql, info,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// POST measureName
server.post('/:measureName', function(req, res) {
  let data = req.body.data;
  let vitalsScore = req.body.vitalsScore;
  let info = {};
  if (vitalsScore == null){
    info = {data: data};
  } else {
    info = {data: data, vitalsScore:req.body.vitalsScore};
  }
  let sql = `INSERT INTO `+req.params.measureName+` SET ?`;
  let query = db.query(sql, info,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


/***************************** PUT  ***************************/

// PUT measureName
server.put('/:measureName/:id', function(req, res) {
  let data = JSON.stringify(req.body.data);
  console.log(data);
  let vitalsScore = req.body.vitalsScore;
  console.log(vitalsScore);
  let sql = "";
  if (vitalsScore == null){
    sql =  `UPDATE `+req.params.measureName+` SET data='`+data+`', vitalsScore='`+vitalsScore+
            `' WHERE id=`+req.params.id;
  } else {
    sql = `UPDATE `+req.params.measureName+` SET data='`+data+`' WHERE id=`+req.params.id;
  }
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});


// PUT browser entry
server.put('/object/browsers/:id', function(req, res) {
  let json = req.body.data;
  let sql = `UPDATE initialBrowserData SET innerHeight='`+json.innerHeight+`', innerWidth='`+json.innerWidth+
            `', outerHeight='`+json.outerHeight+`', outerWidth='`+json.outerWidth+`', language='`+json.language+
            `', userAgent='`+json.userAgent+`' WHERE id=`+req.params.id;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// PUT dataConsumption entry
server.put('/object/dataConsumption/:id', function(req, res) {
  let json = req.body.data;
  let sql = `UPDATE dataConsumption SET beacon='`+json.beacon+`', css='`+json.css+
            `', fetch='`+json.fetch+`', img='`+json.img+`', other='`+json.other+
            `', script='`+json.script+`', total='`+json.total+
            `', xmlhttprequest='`+json.xmlhttprequest+`' WHERE id=`+req.params.id;
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
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

server.listen(3003, () => console.log(`Server started, listening port: 3003`));
