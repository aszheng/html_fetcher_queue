const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js')

//required to run worker in background
const Cron = require('./worker.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

