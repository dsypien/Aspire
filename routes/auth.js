var express = require('express');
var router = express.Router();

router.post('/signup', function(req,res){
	console.log(req.body);
	res.send("okays");
});



module.exports = router;