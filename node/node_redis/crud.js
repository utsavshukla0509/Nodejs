const express = require("express");
const router = express.Router();
var access = require('./access.js');
// const book = require('./schema');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');



router.post('/book', function (req, res) {
    if (!req.body.title || !req.body.author) res.status(400).send("Please send a title and an author for the book");
    else if (!req.body.text) res.status(400).send("Please send some text for the book");
    else {
        access.saveBook(req.body.title, req.body.author, req.body.text,res, function (err) {
        res.redirect('/api/book');
            if (err) res.status(500).send("Server error");
            else res.status(201).send("Saved");
        
        });
    }
 });

// without Cache

// router.get('/book/:title', function (req, res,next) {
//     if (!req.param('title')) res.status(400).send("Please send a proper title");
//     else {
//         access.findBookByTitle(req.param('title'), function (book) {
//             // if (!text) res.status(500).send("Server error");
//             // else
//              res.status(200).send(book);
//         });
//     }
// });

// with Cache
router.get('/book/:title', function (req, res) {
    if (!req.param('title')) res.status(400).send("Please send a proper title");
    else {
        access.findBookByTitleCached(redis, req.param('title'), function (book) {
            // if (!text) res.status(500).send("Server error");
            // else 
            res.status(200).send(book);
        });
    }
});


module.exports = router;