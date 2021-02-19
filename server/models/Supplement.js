const mongoose = require('mongoose')
const validator = require('./validator')

const SupplementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    validate: validator.namedLength('Name', 1, 512),
    set: validator.toLower,
  },
  value: {
    type: Number,
    required: true,
    validate: validator.floatInRange('Value', 0.0, 1000000.0),
  },
  unit: {
    type: String,
    required: true,
    validate: validator.namedLength('Unit', 1, 512),
  },
})

SupplementSchema.index({ user: 1 })

module.exports = mongoose.model('supplement', SupplementSchema)

const preloads = [
  {
    name: 'vitamin d3',
    value: 125,
    unit: 'mcg',
  },
]

module.exports.preloads = preloads
