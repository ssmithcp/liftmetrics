const mongoose = require('mongoose')
const validator = require('./validator')

const BodyWeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
    validate: validator.weightInRange,
  },
  unit: {
    type: String,
    required: true,
    validate: validator.isWeightUnit,
  },
})

BodyWeightSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('bodyWeight', BodyWeightSchema)
