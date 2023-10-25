const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);