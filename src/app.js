require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const travelRouter = require('./travelData/travel-data-router');
const packRouter = require('./packData/pack-data-router');
const usersRouter = require('./usersData/user-router');
const authRouter = require('./Auth/auth-router');
const config = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(
    cors({
        origin: config.CLIENT_ORIGIN || 3000
    })
);
app.use(helmet())
app.use(usersRouter)

app.use(authRouter)
app.use(travelRouter)
app.use(packRouter)
app.get('/', (req,res) => {
    res.send('Hello, world!')
})


app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app

