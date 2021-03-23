const router = require('express').Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const authLockRoute = require('./authLockedRoute')


// GET/users

router.get('/', (req, res) => {
    console.log('hello')
    res.json({msg: 'hello from users'})
})

// POST /users/register
router.post('/register', async (req, res) => {
    try{
        const findUser = await User.findOne({
            email: req.body.email
        })
    if (findUser) return res.status(400).json({msg: 'email already exist'})

    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await newUser.save()

    // jwt payload
    const payload = {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id
    }

    // sign in and send it back
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60})

    res.json({token})

    }catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Server not found'})
    }
    
})
/router.post('/login', async (req, res) => {
    try {
      // try to find the user in db from the req.body
      const foundUser = await User.findOne({
        email: req.body.email
      })
  
      const noLoginMessage = 'Incorrect username or password'
  
      // if the user is not found -- return with a failure status and a message (incorrect email)
      if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
  
      // check the password from the db against the req.body
      const matchPassword = await bcrypt.compare(req.body.password, foundUser.password)
  
      // if the provided password doesn't match -- return with a failure status
      if(!matchPassword) return res.status(400).json({ msg: noLoginMessage})
  
      // create jwt token
      const payload = {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser.id
      }
  
      // sign the jwt token and send it back
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
  
      res.json({ token })
    } catch(error) {
      console.log(error)
      res.status(500).json({ msg: 'server error AHHHHHH!' })
    }
  })
  
  // GET /auth-locked -- redirect if a bad token is found
  router.get('/auth-locked', (req, res) => {
    res.json({ msg: 'Welcome to the private rouote!' })
  })



module.exports = router