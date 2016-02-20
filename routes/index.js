var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res){
	res.send("Hello! servers up!");
});

router.get('/users', function(req, res){
	User.find({}, function(err, users){
		res.json(users);
	});
});

router.delete('/users', function(req, res){
	User.remove({_id: req.body.id}, function(err){
		if(err){
			res.json({success : false, message: err.message});
			return;
		}

		res.json({success: true});
	});
})

module.exports = router;