const mongoose = require('mongoose')
const validator = require('./validator')

const ConsumedSupplement = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  supplement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'supplement',
    required: true,
  },
  servings: {
    type: Number,
    required: true,
    validate: validator.floatInRange('Servings', 0.0, 1000000.0)
  },
})

ConsumedSupplement.index({ user: 1, created: -1 })

module.exports = mongoose.model('consumedSupplement', ConsumedSupplement)
