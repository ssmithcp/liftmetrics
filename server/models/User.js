const mongoose = require('mongoose')

const availableRoles = [ 'admin', 'user', 'demo' ]

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 7,
    maxLength: 120,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
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
    default: [ 'user' ],
    validator: roles => roles.every(role => availableRoles.includes(role)),
  }
})

module.exports = mongoose.model('user', UserSchema)
