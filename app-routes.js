module.exports = function(app, passport){
	app.post('./signup', passport.authenticate('local-signup', {
		failureRedirect: '/signup',
		successRedirect: '/',
		failureFlash: true
	}));
};