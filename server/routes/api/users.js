const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

const config = require('../../util/config')
const User = require('../../models/User');

const register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  console.log('new user request', { ...req.body, password: '******' })
  const { firstName, lastName, email, password } = req.body

  try {
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

    user = new User({
      firstName,
      lastName,
      email,
      avatar,
      password
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) {
          throw err
        }

        const expires = new Date(Date.now() + (5 * 24 * 60 * 60 * 1000))

        console.log('expires date', expires)

        res.cookie('access_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          expires,
        })

        res.json({ profile: 'adf' })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

router.post('/', register)

module.exports = router