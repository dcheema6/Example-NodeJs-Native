//==========  IMPORTS  ========================================
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

//=========ROUTE IMPORTS==================================
var indexRouter = require('./routes/index');
var searchRouter = require('./routes/search');

var app = express();

//========BODY PARSER CONFIGURATION==================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true }));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//========ROUTE CONFIG==================================
app.use('/', indexRouter);
app.use('/search', searchRouter);

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
