const mongoose = require('mongoose')

const HostSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = Host = mongoose.model('hosts', HostSchema)