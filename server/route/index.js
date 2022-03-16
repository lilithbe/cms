import express from 'express'
import Admin from './admin'
import Check from './check'
import Auth from './auth'
import Content from './content'
import File from './file'
// import SingleQuery from './singleQuery'
import Shop from './shop'
import Calendar from './calendar'
import Popup from './popup'
import Vote from './vote'

import Widget from './widget'
import Page from './page'
const route=express.Router()

route.use('/admin',Admin)
route.use('/check',Check)
route.use('/auth',Auth)
route.use('/content',Content)
route.use('/file',File)
route.use('/shop',Shop)

route.use('/calendar',Calendar)
route.use('/popup',Popup)
route.use('/vote',Vote)
route.use('/widget',Widget)
route.use('/page',Page)

// route.use('/singleQuery',SingleQuery)


module.exports = route