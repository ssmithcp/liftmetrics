const mongoose = require('mongoose')
const { weightUnits } = require('./Profile')

const BodyWeightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
  },
  weight: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
    validator: units => units.every(unit => weightUnits.includes(unit)),
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('bodyWeight', BodyWeightSchema)
