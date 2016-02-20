var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.use(function(req,res,next){
	console.log("authenticating");
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if(token){
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
			if(err){
				return res.json({
					success: false, 
					message: 'Failed to authenticate'
				});
			}
			else{
				// save in req for use for other routes
				req.decoded = decoded;
				next();
			}
		});
	} else{
		return res.status(403).send({
			success: false, 
			message: 'No token provided'
		});
	}
});

module.exports = router;