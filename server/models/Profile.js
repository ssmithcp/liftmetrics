const mongoose = require('mongoose')

const weightUnits = [ 'lb', 'kg' ]
const lengthUnits = [ 'in', 'cm' ]

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  weightUnit: {
    type: String,
    default: 'lb',
    validator: units => units.every(unit => weightUnits.includes(unit)),
  },
  lengthUnit: {
    type: String,
    default: 'in',
    validator: units => units.every(unit => lengthUnits.includes(unit)),
  },
  weekStartDay: {
    type: Number,
    default: 1, // Monday
    min: 0,
    max: 6,
  },
})

module.exports = mongoose.model('user', ProfileSchema)
