import express from 'express'
import Upload from './upload'
import List from './list'
import Download from './download'
import Update from './update'
import Delete from './delete'
import Editor from './editor'
const route=express.Router()
route.use('/upload/',Upload)
route.use('/list',List)
route.use('/download',Download)
route.use('/update',Update)
route.use('/delete',Delete)
route.use('/editor',Editor)
module.exports = route