var dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const body = require("body-parser");
const flash = require('express-flash')
const path =  require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mysql = require('mysql');
const app = express();


const passport = require('passport');
const { runInNewContext } = require('vm');
const LocalStrategy = require('passport-local').Strategy;

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

// Find user using username or email 
function findUser(username, func) {
    // Find by email
    let sql = "";
    let ret = "";
    if(username.includes("@")){
        sql = "SELECT * FROM users WHERE email = '" + username + "'";
    // Find by username
    } else {
        sql = "SELECT * FROM users WHERE username = '" + username + "'";	
    }
    let query = db.query(sql, (err, rows) => {
        if (err)
            return func(err, null);
        if (!rows.length) {
            return func(null, null); // req.flash is the way to set flashdata using connect-flash
        }
        // all is well, return successful user
        return func(null, rows[0]);	
    });
}

passport.serializeUser(function(user, done) {
    done(null, user.username);
});
passport.deserializeUser(function(username, done) {
    findUser(username, function(err, user) {
        done(err, user);
    });
});


// Use strategy
passport.use( new LocalStrategy({ usernameField: 'username',
                                  passwordField: 'password' },
    function(username, password, done) {
        findUser(username, function(err, user) {
            if ( err ) { 
                return done(err); 
            }
            else if ( !user ){ 
                return done(null, false, {
                    'message': 'User does not match'
                });
            }
            else {
                bcrypt.compare(password, user.password,  function(err, result){
                    if (result == true){
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }); 
            }
            // return done(null, user);
        });
    }
));

app.set('view-engine', 'ejs');
app.use(flash());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, 
                  saveUninitialized: false }));

app.use(body());
app.use(passport.initialize());
app.use(passport.session());


// Check user authentication before accessing page
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/login')
}

function checkAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.role){
        return next();
    }
    console.log("Non-admin user tried to access user management")
    return res.redirect('/')
}

/******************** ROUTES ********************/

// Public side: Login page
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});
app.post('/login', passport.authenticate('local', 
    { successRedirect: '/', failureRedirect: '/login', failureFlash: true}
));
 
// In between: Logout
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('login');
});

 
// Private side: Home page
app.get('/', checkAuthenticated, function(req, res) {
    res.render('index.ejs', { name: req.user.username, role:req.user.role })
});

// Report
app.get('/tbt', checkAuthenticated, function(req, res) {
    res.render('tbt.ejs', { name: req.user.username, role:req.user.role })
});

// User management page
app.get('/users', checkAdmin, function(req, res) {
    res.render('users.ejs', { name: req.user.username, role:req.user.role })
});
// User management API
app.get('/api/users', checkAdmin, function(req, res) {
    let sql = `SELECT * FROM users`;
    db.query(sql, function(err, data, fields) {
      if (err) throw err;
      res.send(data);
    })
});
app.post('/api/users', checkAdmin, function(req, res) {
    let info = req.body;
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        req.body.password = hash;
        let sql = `INSERT INTO users SET ?`;
        db.query(sql, info, function(err, data, fields) {
            if (err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
        });
    });
});
app.delete('/api/users/:id', checkAdmin, function(req, res){
    let sql = `DELETE FROM users WHERE id=`+req.params.id;
    db.query(sql, function(err, data, fields) {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
    })
});
app.put('/api/users/:id', checkAdmin, function(req, res){
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        req.body.password = hash;
        console.log(hash);
        let sql = `UPDATE users SET username='`+req.body.username+`', email='`+req.body.email+
                `', password='`+req.body.password+`', role=`+req.body.role+` WHERE id=`+req.params.id;
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
    });
});


app.listen(3100, () => console.log(`Server started, listening port: 3100`));
