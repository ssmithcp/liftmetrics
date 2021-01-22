const express = require('express')
const router = express.Router()

const { withoutErrors, asyncHandler } = require('../../middleware/errors')

const login = asyncHandler(async (req, res) => {

})

router.post('/login', withoutErrors, login)

router.get('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.send()
})

module.exports = router