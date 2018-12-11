let mongoose = require('mongoose');

var barangSchema = new mongoose.Schema({
    namaBarang: String,
    kodeBarang: Number,
    
});

module.exports = mongoose.model('MasterBarang', barangSchema);
