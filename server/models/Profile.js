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
  },
  lengthUnit: {
    type: String,
    default: 'in',
    validate: validator.isLengthUnit,
  },
  avatar: {
    type: String,
  },
})

ProfileSchema.index({ user: 1 })

module.exports = mongoose.model('profile', ProfileSchema)