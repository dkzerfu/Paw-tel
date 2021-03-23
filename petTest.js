require ('./models')
const Pet = require('./models/Pet')

// Create
async function createPet() {
    const newPet = await Pet.create({
        pet_name: 'Fluffy',
        breed: 'Persian',
        age: 16,
        weight: 12,
        special_needs: 'Shy around humans',
        medications: 'Eyedrops 2x daily'
    })
    console.log(newPet)
}
// createPet()

// Read (Index)
async function readAllPets() {
    const allPets = await Pet.find({})
    console.log(allPets)
}
// readAllPets()

// Read (Show)
async function show() {
    const pet = await Pet.findOne({
        pet_name: 'Fluffy'
    })
    console.log(pet)
}
// show()

// Update
async function update() {
    const updatedPet = await Pet.findOneAndUpdate({
        pet_name: 'Fluffy'
    }, {
        medications: 'Eyedrops 1x daily'
    })
    console.log(updatedPet)
}
// update()

// Delete
async function deletePet() {
    const deletedPet = await Pet.deleteOne({
        pet_name: 'Fluffy'
    })
    console.log(deletedPet)
}
// deletePet()

