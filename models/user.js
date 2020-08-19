const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    code: String,
    name: String,
    age: Number,
    roles: [{type: mongoose.Types.ObjectId}]
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);