const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.send('auths route'))

module.exports = router