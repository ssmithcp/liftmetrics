const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const config = require('../../config')
const User = require('../../models/User')
const { attachAuthToken } = require('../../middleware/auth')
const { catchErrors } = require('../../middleware/errors')

const register = catchErrors(async (req, res) => {
  console.log('new user request', { ...req.body, password: '******' })

  const { firstName, lastName, email } = req.body
  let user = await User.findOne({ email })

  if (user) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'User already exists' }] })
  }

  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(req.body.password, salt)

  user = new User({
    firstName,
    lastName,
    email,
    password
  })
  await user.save()

  await attachAuthToken(res, user)
  res.send()
})

router.post('/register', register)

const login = catchErrors(async (req, res) => {
  console.log('login request', { ...req.body, password: '******' })

  const { email, password } = req.body
  let user = await User.findOne({ email })

  if (!user) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Login failed' }] })
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: 'Login failed' }] });
  }

  user.lastLogin = Date.now()
  await user.save()

  await attachAuthToken(res, user)
  res.send()
})

router.post('/login', login)

router.get('/logout', (req, res) => {
  res.clearCookie('access_token')
  res.send()
})

module.exports = router