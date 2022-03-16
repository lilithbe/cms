import express from 'express'
import Member from './member'
import Config from './config'
import Content from './content'
import BulkUpdate from './bulk_update'
const route=express.Router()
route.use('/member',Member)
route.use('/config',Config)
route.use('/content',Content)
route.use('/bulk',BulkUpdate)
module.exports = route