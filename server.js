var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
require('./config/passport')(passport); // pass passport for configuration
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// Body Parser Middleware
app.use(bodyParser.json()); 
app.use(morgan('dev')); // log tất cả request ra console log
app.use(cookieParser()); // đọc cookie (cần cho xác thực)
app.locals.moment = require('moment');
app.use(cookieParser());
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
  
});

// set the view engine to ejs


app.set('view engine', 'ejs');
var _secret ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzNTM0NTQzNTQzNTQzNTM0NTMiLCJleHAiOjE1MDQ2OTkyNTZ9.zG-2FvGegujxoLWwIQfNB5IT46D-xC4e8dEDYwi6aRM";
// các cài đặt cần thiết cho passport
app.use(session({secret: _secret})); // chuối bí mật đã mã hóa coookie
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/public/assets', express.static('public/assets'));
app.use('/both/img/website', express.static('public/images'));
app.use('/images', express.static('public/images'));
app.use('/asset/images', express.static('public/upload'));
app.use('/uploads', express.static('public/uploads'));
app.use('/both/fonts', express.static('public/fonts'));
app.use('/ckeditor', express.static('public/ckeditor'));

var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(configDB.url); // kết nối tới db

var AccountController = require('./controller/main/AccountController.js');
app.use("/account",AccountController);

var HomeController = require('./controller/main/HomeController.js');
app.use("/",HomeController);

var UploadController = require('./controller/main/UploadController.js');
app.use("/upload",UploadController);


var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });