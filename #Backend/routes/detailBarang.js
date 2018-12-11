let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
let detailBarang = require('../models/detailBarang.js');
let jenisBarang = require('../models/JenisBarang.js');
let barang = require('../models/Barang.js');

// get
router.get('/', function(req, res, next){
    detailBarang.find(function(err, detailbarang){
        if(err) return next(err);
        res.json(detailbarang);
    });
});

// post
router.post('/', function(req, res, next){
    let jnsBarang = new jenisBarang({name: 'Kertas', kodeJenis: '12'});
    let barangs = new barang({name: 'Buku', kodeJenis: '14'});

    let namaBarang = req.body.namaBarang;
    let namaJenis = req.body.namaJenis;
    let beratBarang = req.body.beratBarang;

    let detail = new detailBarang()

    detail.namaBarang = namaBarang;
    detail.namaJenis = namaJenis;
    detail.beratBarang = beratBarang;

    detail.save(function(err){
        if(err) {
            console.log('error ketika menambahkan data');
            res.send({success: 'gagal', status: 500});
        }
        res.send({
            success:'Suskes',
            status: 200,
            data: req.body
        });
    });
});
router.delete('/:id', function(req, res, next){
    detailBarang.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
    console.log('ID : ', req.params.id , 'telah di delete');
});

module.exports = router;