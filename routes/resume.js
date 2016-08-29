var express = require('express'),
	router = express.Router();

module.exports = function(req, res, next) {
	res.render('resume', {title: 'Resume'});
};