
const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    pet_name: String,
    breed: String,
    age: Number,
    weight: Number,
    special_needs: String,
    medications: String,
    image_url: String
})

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet