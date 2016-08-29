var express = require('express'),
	router = express.Router(),
	mongodb = require('mongodb'),
	dateFormat = require('dateformat');

var MongoClient = mongodb.MongoClient,
	url = 'mongodb://localhost:27017/blog';

router.get('/', function(req, res, next) {

    res.render('under-construction');
	// MongoClient.connect(url, function(err, db) {
	// 	if (err) {
 //            console.log('Unable to connect to server');
 //        } else {
 //            var collection = db.collection('projects');

 //            collection.find({}).toArray(function(err, content) {
 //                if (err) send(err);

 //                res.render('projects/index', {
 //                	title: 'Recent Work',
 //                    projects: content
 //                });
 //                db.close();
 //            });
 //        }
	// });
});

router.get('/:slug', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            var collection = db.collection('projects');

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