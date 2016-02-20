var express = require('express');
var router 	= express.Router();
var User = require('../models/user');

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
			res.json({success: true});
		})
	});

});

module.exports = router;