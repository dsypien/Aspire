var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var flash    = require('connect-flash');

var authRouter = require('./routes/auth');

// DB setup
var dbConfigUrl = require('./config/database.js').url;
var dbSetup = require('./db/setup.js');
var db = dbSetup(dbConfigUrl, app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'z7Xd2Wb%3@cM90wp*dX@98Po@1^dMn14n2'})); // session secret
require('./config/passport.js')(app);
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
//require('./app-routes.js')(app, passport);

app.use('/signup', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
