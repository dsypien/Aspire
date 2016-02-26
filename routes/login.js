var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
	console.log('req');
	var email = req.body.email;
	var pwd = req.body.password;

	User.findOne({'local.email' : email}, function(err, user){
		if(err){
			res.json({success : false, message: err.message});
			return;
		}

		if(!user){
			res.json({success : false, message: "A user with this email does not exist."});
			return;
		}

		if(user.validPassword(pwd)){
			var token = jwt.sign(user, req.app.get('superSecret'), {
				expiresInMinutes: 1440
			});

			res.cookie('x-access-token', token, { maxAge: 900000, httpOnly: true });
			res.json({success: true, token: token});
		}
		else{
			res.json({success : false, message: "The email and password you entered do not match."});
		}
	});
});

module.exports = router;