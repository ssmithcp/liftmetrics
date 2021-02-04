const mongoose = require('mongoose')
const validate = require('./validator')

const availableRoles = [ 'admin', 'user', 'free', 'demo' ]

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: validate.alphaString('First name', 3, 50),
  },
  lastName: {
    type: String,
    required: true,
    validate: validate.alphaString('Last name', 1, 50),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validate.namedLength('Email', 7, 120),
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  roles: {
    type: [String],
    default: [ 'free' ],
    validate: {
      validator: roles => roles.every(role => availableRoles.includes(role)),
    },
  }
})

module.exports = mongoose.model('user', UserSchema)
