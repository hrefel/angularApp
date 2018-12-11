let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Barang = require('../models/Barang.js');

//get
router.get('/', function (req, res, next) {
    Barang.find(function (err, barangs) {
        if (err) return next(err);
        res.json(barangs);
    });
});

// post
router.post('/', function (req, res, next) {
    Barang.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// get by id
router.get('/:id', function (req, res, next) {
    Barang.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// put or update
router.put('/:id', function (req, res, next) {
    Barang.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Barang.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;