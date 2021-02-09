const mongoose = require('mongoose')
const validator = require('./validator')

const side = [ 'left', 'right', 'N/A' ]

const MeasurementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  definition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'measurementDefinition',
  },
  value: {
    type: Number,
    required: true,
    validator: validator.lengthInRange,
  },
  unit: {
    type: String,
    required: true,
    validator: validator.isLengthUnit,
  },
  side: {
    type: String,
    required: true,
    validator: validator.namedEnum('Side', side),
  },
  flexed: {
    type: Boolean,
    required: true,
    default: false,
  },
  note: {
    type: String,
    validator: validator.namedLength('note', 1, 1024)
  },
})

MeasurementSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('measurement', MeasurementSchema)
