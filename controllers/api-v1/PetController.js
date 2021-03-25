const router = require('express').Router()
const { User, Pet } = require('../../models/user')
const authLockedRoute = require('./authLockedRoute')

router.post('/', authLockedRoute, async (req, res) => {
    try {
        const newPet = new Pet({
            pet_name: req.body.pet_name,
            breed: req.body.breed,
            age: req.body.age,
            weight: req.body.weight,
            special_needs: req.body.special_needs,
            medications: req.body.medications,
            image_url: req.body.image_url
        })
        let id = res.locals.user._id
        const foundUser = await User.findById(id)
        newPet.save()
        foundUser.pets.push(newPet)
        await foundUser.save()
        res.json(newPet)
    } catch(err) {
        console.log(err)
        res.status(400).json({ msg: 'Unable to register pet' })
    }
})

// Read (Index)
router.get('/', authLockedRoute, async(req, res) => {
    try {
        let id = res.locals.user._id
        const allPets = await User.findById(id).populate('pets')
        res.json(allPets)
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'Unable to find pets'})
    }
})

// Read (Show)
router.get('/:id', async(req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.id)
        if(foundPet) {
            res.json(foundPet)
        }
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'A pet with that id has not been found'
        })
    }
})

// Update
router.put('/:id', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.id, {
            pet_name: req.body.pet_name,
            breed: req.body.breed,
            age: req.body.age,
            weight: req.body.weight,
            special_needs: req.body.special_needs,
            medications: req.body.medications,
            image_url: req.body.image_url
        })
        res.json(updatedPet)
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'Unable to update pet'
        })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id)
        res.json(deletedPet)
    } catch (err) {
        console.log(err)
        res.json({
            msg: 'Unable to delete pet'
        })
    }
})


module.exports = router