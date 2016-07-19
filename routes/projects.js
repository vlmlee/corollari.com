var express = require('express');
var router = express.Router();

module.exports = function(req, res, next) {
	res.render('projects', {title: 'Recent Work'});
};