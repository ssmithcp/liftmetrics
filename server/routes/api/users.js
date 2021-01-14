const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

router.post('/',
  check('firstName')
    .isLength({ min: 1, max: 50 })
    .withMessage('firstName must be between 1 and 50 characters'),
  check('lastName')
    .isLength({ min: 1, max: 50 })
    .withMessage('firstName must be between 1 and 50 characters'),

  (req, res) => {
    console.log('new user request', req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // see if user exists
    // get gravirar
    // encrypt password
    // return jsonwebtoken

    res.send(JSON.stringify({ success: true }))
  }
)

module.exports = router