require ('./models')
const { User, Pet } = require('./models/user')

// Create
async function createPet() {
    const newPet = new Pet({
        pet_name: 'Fluffy',
        breed: 'Persian',
        age: 16,
        weight: 12,
        special_needs: 'Shy around humans',
        medications: 'Eyedrops 2x daily'
    })
    const foundUser = await User.findOne({
        name: 'moop'
    })
    newPet.save()
    foundUser.pets.push(newPet)
    await foundUser.save()
    console.log(foundUser)
}
createPet()

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

