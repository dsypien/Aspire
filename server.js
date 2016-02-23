var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');

var config = require('./config/database');

var indexRoute = require('./routes/index');
var ngAppRoute = require('./routes/ng-app');
var authenticateRoute = require('./routes/authenticate');
var registerRoute = require('./routes/register');
var loginRoute = require('./routes/login');

// Config
var port = process.env.PORT || 3000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

//routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/authenticate', loginRoute);
app.use('/registeruser', registerRoute);
app.use('/', ngAppRoute);
//app.use('/dep/', ngAppRoute);

app.use(authenticateRoute);// Authenticate all routes after this
app.use('/', indexRoute);


app.listen(port);
console.log('Server running on port ' + port);