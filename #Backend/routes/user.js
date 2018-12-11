var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

// get
router.get('/', function (req, res, next) {
    User.find(function (err, post) {
        if (err) return next(err);
        res.json(post);
        console.log(res.json)
    })
})

// post
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// delete 
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if(err) return next(err);
        res.json(post);
    })
})
module.exports = router;