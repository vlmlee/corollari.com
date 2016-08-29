var express = require('express'),
    router = express.Router(),
    mongodb = require('mongodb'),
    dateFormat = require('dateformat');
// var ObjectId = require('mongodb').ObjectID; // not needed for now

var MongoClient = mongodb.MongoClient,
    url = 'mongodb://localhost:27017/blog';

router.get('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            var collection = db.collection('posts');
            collection.find({}).sort({createdAt: -1}).toArray(function(err, content) {
                if (err) {
                    res.send(err);
                } else if (content.length) {
                    for (var i = 0; i < content.length; i++) {
                        timeStamp = content[i].createdAt;
                        content[i].createdAt = dateFormat(timeStamp, "dddd, mmmm dS yyyy");
                    }
                    res.render('blog/index', {
                        posts: content
                    });
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});

router.get('/:slug', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            var collection = db.collection('posts');
            collection.find({ slug: req.params.slug }).toArray(function(err, content) {
                if (err) {
                    send(err);
                } else {
                    timeStamp = content[0].createdAt;
                    content[0].createdAt = dateFormat(timeStamp, "dddd, mmmm dS yyyy");
                    res.render('blog/show', {
                        post: content
                    });
                }
                db.close();
            });
        }
    });
});

module.exports = router;
