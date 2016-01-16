var User = require('../db/models/user.js');
var passport = require('passport');

module.exports = function(app){
	app.use(passport.initialize());
	app.use(passport.session()); 

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	require('./strategies/local.strategy')();
};