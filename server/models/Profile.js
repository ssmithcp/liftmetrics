const mongoose = require('mongoose')

const weightUnits = [ 'lb', 'kg' ]
const lengthUnits = [ 'in', 'cm' ]

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
  avatar: {
    type: String,
  },
})

module.exports = mongoose.model('profile', ProfileSchema)

module.exports.weightUnits = weightUnits
module.exports.lengthUnits = lengthUnits