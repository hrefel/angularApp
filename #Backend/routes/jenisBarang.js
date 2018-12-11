let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jenisBarang = require('../models/JenisBarang.js');

// get
router.get('/', function (req, res, next) {
    jenisBarang.find(function (err, jnsBarang) {
        if (err) return next(err);
        res.json(jnsBarang);
    });
});
// post
router.post('/', function (req, res, next) {
    jenisBarang.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

module.exports = router;