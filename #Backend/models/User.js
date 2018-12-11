let mongoose = require('mongoose');


// FormatDate = mongoose.Schema.Types.FormatDate = require('mongoose-schema-formatdate');

var userSchema = new mongoose.Schema({
    nama: { type: String, required: true },
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
// hasing password

// password verification

userSchema.methods.incLoginAttemps = function (callback) {
    if (this.lockUntill && this.lockUntill < Date.now()) {
        return this.update({
            $set: { loginAttemps: 1 },
            $unset: { lockUntill: 1 }
        }, callback);
    }
    var updates = { $inc: { loginAttemps: 1 } };
    if (this.loginAttemps + 1 >= MAX_LOGIN_ATTEMPS && !this.isLocked) {
        updates.$set = { lockUntill: Date.now() + LOCK_TIME };
    }
    return this.update(updates, callback);
};
// defined failed login reason
var reasons = userSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
}
userSchema.statics.getAuthenticate = function (username, password, callback) {
    this.findOne({ username: username }, function (err, user) {
        if (err) return callback(err);

        // make sure the user is exist
        if (!user) {
            return callback(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            return user.incLoginAttemps(function (err) {
                if (err) return callback(err);
                return callback(null, null, reasons.MAX_ATTEMPTS);
            });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) return callback(err);

            if (isMatch) {
                if (!user.loginAttemps && !user.lockUntill) return callback(null, user);
                var updates = {
                    $set: { loginAttemps: 0 },
                    $unset: { lockUntill: 1 }
                };
                return user.update(updates, function (err) {
                    if (err) return callback(err);
                    return callback(null, user);
                });
            }
            user.incLoginAttemps(function (err) {
                if (err) return callback(err);
                return callback(null, null, reasons.PASSWORD_INCORRECT);
            })
        })
    })
}
// defined collection here and export module
module.exports = mongoose.model('User', userSchema)