const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    fullName: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    token: {
        type: 'string',
    },
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);