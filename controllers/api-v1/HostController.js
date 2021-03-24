const router = require('express').Router()
const Host = require('../../models/Host')
const bcrypt = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const authLockRoute = require('./authLockedRoute')


// GET/Hosts

router.get('/', (req, res) => {
    console.log('hello')
    res.json({msg: 'hello from Hosts'})
})

// POST /Hosts/register
router.post('/register', async (req, res) => {
    try{
        const findHost = await Host.findOne({
            email: req.body.email
        })
    if (findHost) return res.status(400).json({msg: 'email already exist'})

    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newHost = new Host({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    await newHost.save()

    // jwt payload
    const payload = {
        name: newHost.name,
        email: newHost.email,
        id: newHost.id
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
      
      const foundHost = await Host.findOne({
        email: req.body.email
      })
  
      const noLoginMessage = 'Incorrect Hostname or password'
  
      
      if(!foundHost) return res.status(400).json({ msg: noLoginMessage })
  
      
      const matchPassword = await bcrypt.compare(req.body.password, foundHost.password)
  
      
      if(!matchPassword) return res.status(400).json({ msg: noLoginMessage})
  
     
      const payload = {
        name: foundHost.name,
        email: foundHost.email,
        id: foundHost.id
      }
  
    
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
  
      res.json({ token })
    } catch(error) {
      console.log(error)
      res.status(500).json({ msg: 'server error AHHHHHH!' })
    }
  })
  
  
  router.get('/auth-locked', authLockRoute, (req, res) => {
    res.json({ msg: 'Welcome to the private rouote!' })
  })



module.exports = router