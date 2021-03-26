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
const hotelSchema = new mongoose.Schema({
    hotel_name: String,
    zipcode: Number,
    specialty: String,
    weight_limit_lb: Number,
    phone_number: Number,
    email: String,
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
    date: {
        type: Date,
        default: Date.now
    },
    hostHotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    }],
    properties:[hotelSchema],
    pets: [petSchema],
    isHost: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('users', UserSchema)

const Pet = mongoose.model('Pet', petSchema)

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = {
    User, Pet, Hotel
}