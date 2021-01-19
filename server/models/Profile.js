const mongoose = require('mongoose')

const weightUnits = [ 'lb', 'kg' ]
const lengthUnits = [ 'in', 'cm' ]
const weekStartDays = Array.from(Array(7).keys())

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId
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
  timeZone: {
    type: String,
    default: 'America/Denver',
    maxlength: 50,
  }
})

module.exports = mongoose.model('profile', ProfileSchema)

module.exports.weightUnits = weightUnits
module.exports.lengthUnits = lengthUnits
module.exports.weekStartDays = weekStartDays