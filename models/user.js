const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    isHost: {
        type: Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('users', UserSchema)