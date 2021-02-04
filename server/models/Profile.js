const mongoose = require('mongoose')

const validator = require('./validator')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
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

module.exports = mongoose.model('profile', ProfileSchema)