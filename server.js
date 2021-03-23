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
// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// controllers
app.use('/hotels', require('./controllers/HotelController'))


// request body parser
app.use(express.json())

app.get('/', (req, res) => {
    res.json({msg: 'hello world'})
})

// Controllers
app.use('/api-v1/users', require('./controllers/api-v1/users'))

// tell express to listen
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`welcome to ${PORT} in the morning`)
})