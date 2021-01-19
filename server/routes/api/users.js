const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../../util/config')
const User = require('../../models/User')
const { withoutErrors, asyncHandler } = require('../../middleware/errors')

const register = asyncHandler(async (req, res, next) => {
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

  const payload = {
    user: {
      id: user.id
    }
  }

  const expires = config.get('tokenExpiresSeconds')

  jwt.sign(
    payload,
    config.get('jwtSecret'),
    { expiresIn: `${expires} seconds` },
    (err, token) => {
      if (err) {
        throw err
      }

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        expires: new Date(Date.now() + (expires * 1000))
      })

      res.json({ profile: 'adf' })
    }
  )
})

router.post('/', withoutErrors, register)

module.exports = router