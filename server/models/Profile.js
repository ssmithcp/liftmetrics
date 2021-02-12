const mongoose = require('mongoose')

const validator = require('./validator')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  weightUnit: {
    type: String,
    default: 'lb',
    validate: validator.isWeightUnit,
    required: true,
  },
  lengthUnit: {
    type: String,
    default: 'in',
    validate: validator.isLengthUnit,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
})

ProfileSchema.index({ user: 1 })

module.exports = mongoose.model('profile', ProfileSchema)