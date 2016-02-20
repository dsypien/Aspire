var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/users', function(req,res,next){
	next();
});

router.get('/app', function(req, res, next){
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/dep', function(req, res, next){
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/fonts', function(req, res, next){
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/imgs', function(req, res, next){
   res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
