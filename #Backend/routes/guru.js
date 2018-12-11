var express = require('express');
    router = express.Router();
    mongoose = require('mongoose');
    Guru = require('../models/Guru.js');

// get
router.get('/', function (req, res, next) {
    Guru.find(function (err, guru) {
        if (err) return next(err);
        res.json(guru);
    });
});
// post
router.post('/', function (req, res, next) {
    const nama = req.body.nama;
          lokasi = req.body.lokasi;
          biaya = req.body.biaya;
          gurus = new Guru();

    gurus.nama = nama;
    gurus.lokasi = lokasi;
    gurus.biaya = biaya;

    gurus.save((err, result) => {
        if (err) {
            console.log('error ketika menambah data ke database');
            res.send({ success: 'gagal menambahkan data / Internal Server Error', status: 500 })
        }
        res.send({
            success: 'Sukses menambahkan data OK',
            status: 200,
            author: 'Muhammad Refel Hidayatullah',
            data: req.body,
        });
    })
    console.log(req.body);
});
// getbyid
router.get('/:id', function (req, res, next) {
    Guru.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
// putbyid
router.put('/:id', function (req, res, next) {
    Guru.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
// deletebyid
router.delete('/:id', function (req, res, next) {
    Guru.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
    console.log(req.body.id);
});
module.exports = router;