// required packages
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
require('./models')

// config express app
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// middlewares
app.use(morgan('tiny'))
app.use(cors())

// tell express to listen
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`you are listening to the sound of ${PORT} in the morning`)
})