const express = require('express')

const app = express()
const port = 3000

//Static files handle
app.use(express.static('public'))
//dirname is middleware function to get files from root directory
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//Use templating engine ejs
app.set('views', './src/views')
app.set('view engine', 'ejs')

//Set up routes (no need to specify .js for main)
const mainRouter = require('./src/routes/main')

app.use('/',mainRouter)

//Listen on port 5000
app.listen(port, () => console.log(`Listening on port ${port}`))