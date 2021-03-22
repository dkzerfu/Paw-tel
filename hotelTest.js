require ('./models')
const Hotel = require('./models/Hotel')

// Create
async function createPost() {
    // 2 ways to create a Post
    // Method #1
    // 2 steps, make Post object in memory first, but doesn't actually make it in the DB yet
    let post = new Post({
        content: "Wow, what a great post"
    })
    // Save the post object in the DB
    let savedPost = await post.save()
    console.log(savedPost)

    // Method #2
    // Create the post in one line command instead of two
    const newPost = await Post.create({
        'content': 'Wow, yet another neat post'
    })
    console.log(newPost)
}
createPost()

// Read (Index)
async function readAllHotels() {
    const allHotels = await Hotel.find({})
    console.log(allHotels)
}

// readAllHotels()