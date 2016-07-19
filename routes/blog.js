var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var dateFormat = require('dateformat');
var ObjectId = require('mongodb').ObjectID;

router.get('/', function(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/blog';

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            var collection = db.collection('posts');
            collection.find({}).toArray(function(err, content) {
                if (err) {
                    res.send(err);
                } else if (content.length) {
                    for (var i = 0; i < content.length; i++) {
                        timeStamp = content[i].dateAdded;
                        content[i].dateAdded = dateFormat(timeStamp, "dddd, mmmm dS yyyy");
                    }
                    res.render('blog/index', {
                        posts: content.reverse()
                    });
                } else {
                    res.send('No documents found');
                }
                db.close();
            });
        }
    });
});

router.get('/:id', function(req, res) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/blog';

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log('Unable to connect to server');
        } else {
            var collection = db.collection('posts');
            collection.find({ _id: ObjectId(req.params.id) }).toArray(function(err, content) {
                if (err) {
                    send(err);
                } else {
                    timeStamp = content[0].dateAdded;
                    content[0].dateAdded = dateFormat(timeStamp, "dddd, mmmm dS yyyy");
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
