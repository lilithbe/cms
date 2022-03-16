import express from 'express'
import Category from './category'
import Upload from './upload'
import List from './list'
const route=express.Router()
route.use('/category',Category)
route.use('/upload',Upload)
route.use('/list',List)
module.exports = route