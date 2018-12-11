var mongoose = require('mongoose');

var jenisBarangSchema = new mongoose.Schema({
    namaJenis: String,
    kodeJenis: Number
})

module.exports = mongoose.model('MasterJenisBarang', jenisBarangSchema);