const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

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

  jwt.verify(token, config.get('jwtSecret'), async (error, decoded) => {
    if (error) {
      return res.status(401).end()
    }

    const refreshAfter = config.get('tokenRefreshSeconds') * 1000

    if (decoded.iat + refreshAfter < Date.now() / 1000) {
      const user = await User.findById(decoded.user.id)
      await attachAuthToken(res, user)
      console.log('refreshed auth token for user', user)
    }

    req.user = decoded.user
    next()
  })
})

const attachAuthToken = (res, user) => (
  new Promise((resolve, reject) => {
    const expires = config.get('tokenExpiresSeconds')

    jwt.sign({
        user: {
          id: user.id
        }
      },
      config.get('jwtSecret'),
      { expiresIn: `${expires} seconds` },
      (err, token) => {
        if (err) {
          reject(err)
        }

        res.cookie('access_token', token, {
          httpOnly: true,
          secure: !config.get('isDev'),
          sameSite: true,
          expires: new Date(Date.now() + (expires * 1000))
        })

        resolve()
      }
    )
  })
)

module.exports.attachAuthToken = attachAuthToken