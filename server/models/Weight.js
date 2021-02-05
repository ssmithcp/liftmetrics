const mongoose = require('mongoose')
const validator = require('./validator')

const BodyWeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
    validator: validator.weightInRange,
  },
  unit: {
    type: String,
    required: true,
    validator: validator.isWeightUnit,
  },
})

BodyWeightSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('bodyWeight', BodyWeightSchema)
