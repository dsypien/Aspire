var express = require('express');
var router 	= express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
	var email = req.body.email;
	var pwd = req.body.password;
	User.findOne({'local.email' : email}, function(err, user){
		if(err){
			res.json({success : false, message: err.message});
			return;
		}

		if(user){
			res.json({success : false, message: "A user with this email already exists."});
			return;
		}

		var newUser = new User();
		newUser.local.email = email;
		newUser.local.password = newUser.generateHash(pwd);
		newUser.local.admin = false;

		newUser.save(function(err){
			if(err){
				res.json({success : false, message: err.message});
				return;
			}

			var token = jwt.sign(user, req.app.get('superSecret'), {
				expiresInMinutes: 1440
			});

			res.cookie('x-access-token', token, { maxAge: 900000, httpOnly: true });
			res.json({success: true, token: token});
		})
	});

});

module.exports = router;