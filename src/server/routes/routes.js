const express = require('express')
const router = express.Router()

const controller = require('../controller/controller.js')

router.get('/', controller.home)

router.get('/submit', function (req, res) {
  res.send('submit route')
})

router.get('/status', function (req, res) {
  res.send('status route')
})

module.exports = router