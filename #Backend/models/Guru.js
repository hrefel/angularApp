var mongoose = require('mongoose');

var guruSchema = new mongoose.Schema({
    nama: String,
    lokasi: String,
    biaya: String,
})

module.exports = mongoose.model('Guru', guruSchema)