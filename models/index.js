const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/pawtel'

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useUnifiedTopology: false
})

const db = mongoose.connection

db.once('open', () => {
    console.log(`mongoDB connection @ ${db.host}:${db.port}`)
})

db.on('error', () => {
    console.error(`someting has gone wrong with the DB \n ${err}`)
})