const express = require('express')
const route = express.Router()

route.use('/api', require('./genericAPI'))

module.exports = route