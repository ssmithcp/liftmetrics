const mongoose = require('mongoose')
const validator = require('./validator')

const MeasurementSiteSchema = new mongoose.Schema({
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
})

MeasurementSiteSchema.index({ user: 1 })

module.exports = mongoose.model('measurementSite', MeasurementSiteSchema)

const preloads = [
  {
    name: 'waist',
  },
  {
    name: 'bicep',
  },
  {
    name: 'thigh',
  },
  {
    name: 'calf',
  },
  {
    name: 'glutes',
  },
  {
    name: 'chest',
  },
  {
    name: 'forearm'
  },
]

module.exports.preloads = preloads
