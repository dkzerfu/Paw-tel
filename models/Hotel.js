
const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    hotel_name: String,
    zipcode: Number,
    specialty: String,
    weight_limit_lb: Number,
    phone_number: Number,
    email: String
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel