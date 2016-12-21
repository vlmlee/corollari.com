const express = require('express'),
	router = express.Router(),
	mongodb = require('mongodb'),
	dateFormat = require('dateformat');

const MongoClient = mongodb.MongoClient,
	url = 'mongodb://localhost:27017/blog';

router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) {
            console.log('Unable to connect to server');
        } else {
            const collection = db.collection('projects');
            collection.find().sort({"pos": 1}).toArray(function(err, content) {
                if (err) send(err);
                res.render('projects/index', {
                	title: 'Recent Work',
                    projects: content
                });
                db.close();
            });
        }
	});
});

router.get('/:slug', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            const collection = db.collection('projects');
            collection.find({ slug: req.params.slug }).toArray(function(err, content) {
                if (err) send(err);
                res.render('projects/show', {
                    project: content
                });
                db.close();
            });
        }
    });
});

module.exports = router;