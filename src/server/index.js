const express = require('express')
const app = express()

const routes = require('./routes/routes.js')

var Order = require('../db/index.js');


app.use('/', routes)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

