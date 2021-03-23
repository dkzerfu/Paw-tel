const router = require('express').Router()
const Pet = require('../../models/Pet')

// Create
router.post('/', async (req, res) => {
    try {

    } catch {
        res.status(400).json({ msg: 'Unable to register pet' })
    }
})

// Read (Index)

// Read (Show)

// Update

// Delete

module.exports = router