const express = require('express')
const router = express.Router()

const { withoutValidationErrors, asyncHandler } = require('../../middleware/errors')

const login = asyncHandler(async (req, res) => {

})

router.post('/login', [withoutValidationErrors], login)

router.get('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.send()
})

module.exports = router