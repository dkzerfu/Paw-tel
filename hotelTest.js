require ('./models')
const Hotel = require('./models/Hotel')
const { User } = require('./models/user')

// Create
async function createHotel() {
    // 2 ways to create a Post
    // Method #1
    // 2 steps, make Post object in memory first, but doesn't actually make it in the DB yet
    // let post = new Post({
    //     content: "Wow, what a great post"
    // })
    // Save the post object in the DB
    // let savedPost = await post.save()
    // console.log(savedPost)

    // Method #2
    // Create the post in one line command instead of two
    const newHotel = await Hotel.create({
        'hotel_name': 'Cat Lodge',
        'zipcode': 98106,
        'specialty': 'Felines',
        'weight_limit_lb': 5,
        'phone_number': 5555555556,
        'email': 'catHotel@cat.cat'
    })
    console.log(newHotel)
}
// createHotel()

// Read (Index)
async function readAllHotels() {
    const allHotels = await Hotel.find({})
    console.log(allHotels)
}
// readAllHotels()

// Read (Show)
async function show() {
    const foundUser = await User.findById(
        "605cba523b343a2a1b70fbec"
    )
    const hotel = await Hotel.findOne({
        hotel_name: 'Dogg Motel'
    })
    if(hotel) {
        if(foundUser.isHost){
            foundUser.hostHotels.push(hotel)
            await foundUser.save()
        }
    }
    console.log(foundUser)
}
 show()

// Update
async function update() {
    const updatedHotel = await Hotel.findOneAndUpdate({
        hotel_name: 'Cat Lodge'
    }, {
        weight_limit_lb: 40
    })
    console.log(updatedHotel)
}
// update()

// Delete
// delete() is not a legal function name
async function deleteHotel() {
    const deletedHotel = await Hotel.deleteOne({
        hotel_name: 'Cat Lodge'
    })
    console.log(deletedHotel)
}
// deleteHotel()