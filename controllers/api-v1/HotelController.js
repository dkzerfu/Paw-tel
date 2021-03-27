const router = require('express').Router()
const {Hotel} = require('../../models/user')
const { User } = require('../../models/user')
const authLockedRoute = require('./authLockedRoute')

// Create
router.post('/',  authLockedRoute, async(req, res) => {
    console.log(res.locals.user)
    try {
        const newHotel = await Hotel.create({
            hotel_name: req.body.hotel_name,
            zipcode: req.body.zipcode,
            specialty: req.body.specialty,
            weight_limit_lb: req.body.weight_limit_lb,
            phone_number: req.body.phone_number,
            email: req.body.email,
            image_url: req.body.image_url
        })
        
        const foundUser = await User.findById(res.locals.user._id)
        newHotel.save()
        foundUser.properties.push(newHotel)
        await foundUser.save()
        res.json(newHotel)
           
        
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: 'Unable to register hotel' })
    }
})

// Read (Index)
router.get('/', async(req, res) => {
    try {
        const allHotels = await Hotel.find({})
        res.json(allHotels)
    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: 'Unable find hotels' })
    }
})

// Read (Show)
router.get('/:id', async(req, res) => {
    try {
        const foundUser = await User.findById(
            res.locals.user._id
        )
        const foundHotel = await Hotel.findById(req.params.id)
        if(foundHotel) {
            if(foundUser.isHost){
                foundUser.hostHotels.push(foundHotel)
                await foundUser.save()
            }
            res.json(foundHotel)
        }
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'A hotel with that id has not been found'
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
            email: req.body.email,
            image_url: req.body.image_url
        })
        const foundUser = await User.findById(res.locals.user._id)
        updatedHotel.save()
        foundUser.properties.push(updatedHotel)
        await foundUser.save()
        res.json(updatedHotel)
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'Unable to update hotel'
        })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.json(deletedHotel)
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'Unable to delete hotel'
        })
    }
})

module.exports = router