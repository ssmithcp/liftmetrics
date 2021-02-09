const mongoose = require('mongoose')

const validator = require('./validator')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  weightUnit: {
    type: String,
    default: 'lb',
    validator: validator.isWeightUnit,
  },
  lengthUnit: {
    type: String,
    default: 'in',
    validator: validator.isLengthUnit,
  },
  avatar: {
    type: String,
  },
})

ProfileSchema.index({ user: 1 })

module.exports = mongoose.model('profile', ProfileSchema)