const mongoose = require('mongoose')
const validator = require('./validator')

const BodyWeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  weight: {
    type: Number,
    required: true,
    validator: validator.isWeight,
  },
  unit: {
    type: String,
    required: true,
    validator: validator.isWeightUnit,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

BodyWeightSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('bodyWeight', BodyWeightSchema)
