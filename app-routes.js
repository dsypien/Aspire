module.exports = function(app, passport){
	app.post('./signup', passport.authenticate('local-signup', {
		failureRedirect: '/signup',
		successRedirect: '/',
		failureFlash: true
	}));
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}