const mongoose = require('mongoose')
const validator = require('./validator')

const MeasurementDefinitionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: Number,
    required: true,
    validator: validator.namedLength('Name', 1, 512),
  },
})

MeasurementDefinitionSchema.index({ user: 1 })

module.exports = mongoose.model('measurementDefinition', MeasurementDefinitionSchema)
