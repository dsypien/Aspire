var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function (){
		passport.use('local-signup', new localStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done){
		consoel.log("signing up");
		process.nextTick(function () {
			User.findOne({ 'local.email' : email }, function(err, user){
				if(err){
					return done(err);
				}

				// user already exists with that email
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
				}
				else{
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err){
							throw err;
						}
						return done(null, newUser);
					});
				}
			});
		});
	}));
};