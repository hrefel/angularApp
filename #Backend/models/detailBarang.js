let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let barangModel = require('./Barang.js');
let jenisBarangModel = require('./JenisBarang.js');

let detailBarangSchema = new mongoose.Schema({
    namaBarang: {
        type:Schema.Types.ObjectId, ref:'Barang'
    },
    namaJenis:{
        type:Schema.Types.ObjectId, ref:'JenisBarang'
    },
    beratBarang: Number,    
})

module.exports = mongoose.model('DetailBarang', detailBarangSchema);