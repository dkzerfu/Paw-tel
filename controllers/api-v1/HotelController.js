const router = require('express').Router()
const Hotel = require('../models/Hotel')

// Create
router.post('/', async(req, res) => {
    try {
        
    } catch(err) {
        console.log(err)
    }
})

// Read (Index)
router.get('/', async(req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
})

// Read (Show)
router.get('/:id', async(req, res) => {
    try {

    } catch (err) {
        res.json({
            msg: "A hotel with that id hasn't been found"
        })
    }
})

// Update 
router.put('/:id', async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
    }
})

module.exports = router