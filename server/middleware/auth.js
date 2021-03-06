const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

const authenticateRequest = function (req, res, next) {
  if (!req.cookies || !req.cookies.access_token) {
    console.log('401 no cookies on request')
    return res.status(401).end()
  }

  jwt.verify(req.cookies.access_token, config.get('jwtSecret'), async (error, decoded) => {
    if (error) {
      console.log('error in jwt.verify', error)
      return res.status(401).end()
    }

    const refreshAfter = config.get('tokenRefreshSeconds') * 1000

    if (decoded.iat + refreshAfter < Date.now() / 1000) {
      const user = await User.findById(decoded.user.id)
      await attachAuthToken(res, user)
      console.log('refreshed auth token for user', user)
    }

    res.locals.user = decoded.user
    next()
  })
}

module.exports = authenticateRequest

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
          secure: !config.get('isDev') && !config.get('isDocker'),
          sameSite: true,
          expires: new Date(Date.now() + (expires * 1000))
        })

        resolve()
      }
    )
  })
)

module.exports.attachAuthToken = attachAuthToken