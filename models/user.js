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

//fav schema
const favoriteSchema = new mongoose.Schema({
    hotel_name: String,
    zipcode: Number
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
    date: {
        type: Date,
        default: Date.now
    },
    hostHotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    }],
    pets: [petSchema],
    isHost: {
        type: Boolean,
        default: false
    },
    favorites: [favoriteSchema]
})

const User = mongoose.model('users', UserSchema)

const Pet = mongoose.model('Pet', petSchema)

module.exports = {
    User, Pet
}