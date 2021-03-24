const mongoose = require('mongoose')

//Subdocument Schema
const petSchema = new mongoose.Schema({
    pet_name: String,
    breed: String,
    age: Number,
    weight: Number,
    special_needs: String,
    medications: String,
    image_url: String
})

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
    date:{
        type: Date,
        default: Date.now
    },
    pets: [petSchema]
})

module.exports = User = mongoose.model('users', UserSchema)
module.exports = Pet = mongoose.model('Pet', petSchema)