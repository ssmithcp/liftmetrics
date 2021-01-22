const jwt = require('jsonwebtoken')
const config = require('../config')

const { asyncHandler } = require('./errors')

module.exports = asyncHandler(function (req, res, next) {
  const cookies = req.header('cookie')

  if (!cookies) {
    return res.status(401).end()
  }

  const token = cookies.split(';')
    .map(c => c.trim())
    .map(c => {
      const parts = c.split('=')
      return {
        name: parts[0],
        value: parts[1],
      }
    })
    .filter(c => c.name === 'access_token')
    .map(c => c.value)
    .find(() => true)

  jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
    if (error) {
      return res.status(401).end()
    } else {
      req.user = decoded.user
      next()
    }
  })
})
