const router = require('express').Router()
const Hotel = require('../models/Hotel')

// Create
router.post('/', async(req, res) => {
    try {
        console.dir(req.body)
        const newHotel = await Hotel.create({
            hotel_name: req.body.hotel_name,
            zipcode: req.body.zipcode,
            specialty: req.body.specialty,
            weight_limit_lb: req.body.weight_limit_lb,
            phone_number: req.body.phone_number,
            email: req.body.email
        })
        res.json(newHotel)
    } catch(err) {
        console.log(err)
    }
})

// Read (Index)
router.get('/', async(req, res) => {
    try {
        const allHotels = await Hotel.find({})
        res.json(allHotels)
    } catch (err) {
        console.log(err)
    }
})

// Read (Show)
router.get('/:id', async(req, res) => {
    try {
        const foundHotel = await Hotel.findById(req.params.id)
        if(foundHotel) {
            res.json(foundHotel)
        }
    } catch (err) {
        res.json({
            msg: "A hotel with that id hasn't been found"
        })
    }
})

// Update 
router.put('/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
            hotel_name: req.body.hotel_name,
            zipcode: req.body.zipcode,
            specialty: req.body.specialty,
            weight_limit_lb: req.body.weight_limit_lb,
            phone_number: req.body.phone_number,
            email: req.body.email
        })
        // res.json(updatedHotel)
    } catch (err) {
        console.log(err)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.json(deletedHotel)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router