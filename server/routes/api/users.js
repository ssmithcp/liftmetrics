const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../../config')
const User = require('../../models/User')
const profile = require('./profiles')
const { withoutValidationErrors, asyncHandler } = require('../../middleware/errors')

const register = asyncHandler(async (req, res) => {
  console.log('new user request', { ...req.body, password: '******' })

  const { firstName, lastName, email } = req.body
  let user = await User.findOne({ email })

  if (user) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'User already exists' }] })
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'monsterid'
  }, true)

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  user = new User({
    firstName,
    lastName,
    email,
    avatar,
    password
  })
  await user.save()

  const profileContents = await profile.getOrCreate(user);
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
        throw err
      }

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: !config.get('isDev'),
        sameSite: true,
        expires: new Date(Date.now() + (expires * 1000))
      })

      res.json(profileContents)
    }
  )
})

router.post('/', [withoutValidationErrors], register)

module.exports = router