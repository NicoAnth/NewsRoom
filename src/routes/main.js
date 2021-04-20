const express = require('express')
const mainRouter = express.Router()

mainRouter.get('', async(req, res) => {
    res.render('index')
})

//Important line, if no set, error in app.js requires a middleware function
module.exports = mainRouter
