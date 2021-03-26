const jwt = require('jsonwebtoken')
const { User } = require('../../models/user.js')
require('dotenv').config()

// route specific middleware for jwt auth
const authLockedRoute = async (req, res, next) => {
  try {
    // find an incoming jwt
    const authHeader = req.headers.authorization

    // try to decode it -- if fails will throw to catch
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET)

    // find the user from the db
    const foundUser = await User.findById(decode.id)

    res.locals.user = foundUser
    next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: 'auth failed' })
  }
}

module.exports = authLockedRoute