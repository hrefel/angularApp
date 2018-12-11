let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let commentSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: {type:Date, default: Date.now()}
});

module.exports = mongoose.model('Comment', commentSchema);