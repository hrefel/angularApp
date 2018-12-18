const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    username: { type: String, required: true, lowercase: true, trim: true},
    password: { type: String, required: true },
    notelp: { type: String, trim: true },
    address: { type: String, default: 'anda belum menambahkan alamat' },
    gender: String,
    bornDate: { type: Date, default: Date.now },
    loginAttemps: { type: Number, required: true, default: 0 },
    lockUntill: { type: Number }
});

// defined collection here and export module
const User = module.exports = mongoose.model('User', userSchema)

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    // bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, 10, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    // });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}