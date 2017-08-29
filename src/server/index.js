const express = require('express')
const app = express()

var routes = require('./routes/routes.js')

app.use('/', routes)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

