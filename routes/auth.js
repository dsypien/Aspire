var express = require('express');
var router = express.Router();

router.post('/signup', function(req,res){
	console.log(req.body);
	req.login(req.body, function(){
		res.redirect('/auth/profile');
	});
	
});

router.get('/profile', function(req, res){
	console.log('redirected to profile');
	console.log(req.user.email);
	//res.json(req.user);
});

module.exports = router;