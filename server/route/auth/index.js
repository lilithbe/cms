import express from 'express'
import Upload from './upload'
import List from './list'
const route=express.Router()
route.use('/upload',Upload)
route.use('/list',List)

module.exports = route