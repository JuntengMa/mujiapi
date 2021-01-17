var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var app = express();

//连接数据库
require("./db/db")


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var version ="/api/v1"
app.use('/', require('./routes/index'));

//user接口路由跳转  
//路由访问路径 http://10.36.149.52:3200/api/v1/users/userLogin,/userLogin是接口
app.use(`${version}/users`, require('./routes/users'));
app.use(`${version}/good`, require('./routes/good')) 
app.use(`${version}/cart`,require('./routes/cart'))
app.use(`${version}/file`, require('./routes/upload'))
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
