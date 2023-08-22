const express = require('express')
const route = express.Router()
const genericAPI = require('../controllers/genericAPI.controller')

route.post('/:tableName', genericAPI.add)
route.put('/:tableName/:id', genericAPI.update)
route.delete('/:tableName/:id', genericAPI.delete)
route.post('/:tableName/getById/:id', genericAPI.getById)
route.post('/:tableName/getAll', genericAPI.getAll)

module.exports = route