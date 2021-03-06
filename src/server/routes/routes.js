const express = require('express')
const router = express.Router()

const controller = require('../controller/controller.js')

router.get('/', controller.home)

router.post('/submit', controller.submit)

router.get('/status/*', controller.status)

module.exports = router