const mongoose = require('mongoose')
const validate = require('mongoose-validator')

const availableRoles = [ 'admin', 'user', 'free', 'demo' ]

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: nameValidator,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
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
