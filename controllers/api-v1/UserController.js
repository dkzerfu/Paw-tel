const router = require('express').Router()
const { User } = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockRoute = require('./authLockedRoute')


// GET/users

router.get('/', (req, res) => {
  console.log(res.locals.user._id, '#######################')
  res.json({ msg: 'hello from users' })
})

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const findUser = await User.findOne({
      email: req.body.email
    })
    if (findUser) return res.status(400).json({ msg: 'email already exist' })

    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      isHost: req.body.isHost
    })
    await newUser.save()
    console.log('This is the new user', newUser)
    // jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
      isHost: req.body.isHost
    }

    // sign in and send it back
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

    res.json({ token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Server not found' })
  }

})
router.post('/login', async (req, res) => {
  try {

    const foundUser = await User.findOne({
      email: req.body.email
    })
    console.log('This is the user:', foundUser)
    const noLoginMessage = 'Incorrect username or password'


    if (!foundUser) return res.status(400).json({ msg: noLoginMessage })


    const matchPassword = await bcrypt.compare(req.body.password, foundUser.password)


    if (!matchPassword) return res.status(400).json({ msg: noLoginMessage })


    const payload = {
      name: foundUser.name,
      email: foundUser.email,
      id: foundUser.id,
      isHost: foundUser.isHost
    }


    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error AHHHHHH!' })
  }
})



router.get('/auth-locked', authLockRoute, async (req, res) => {
  try {
    const foundUser = await User.findById(
      res.locals.user._id
    )
    const hotels = foundUser.properties
    res.json({ hotels })
    // res.json({ msg: 'Welcome to the private rouote!' })

  } catch (error) {
    console.log(error)
  }
})


// GET favorites // make it an auth locked route
// get auth 
router.post('/favorite', authLockRoute, async (req, res) => {
  try {
    let userId = res.locals.user._id
    const userFav = await User.findById(userId)
    userFav.favorites.push({
      hotel_name: req.body.hotel_name,
      zipcode: req.body.zipcode
    })
    await userFav.save()
    res.json(userFav)
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'Unable to favorite hotels' })
  }

})

module.exports = router