const mongoose = require('mongoose')
const validator = require('./validator')

const types = [ 'Primary', 'Secondary', 'Supplementary', 'Accessory', 'Other' ]

const MovementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    validator: validator.alphaString('Name', 1, 100),
  },
  type: {
    type: String,
    required: true,
    validator: validator.namedEnum('Type', types),
  },
  modifiers: {
    type: [String],
    default: [ ],
    validator: validate.arrayItemLength('Modifier', 25, 1, 100),
  },
  targetedMuscles: {
    type: [String],
    default: [ ],
    validator: validate.arrayItemLength('Targeted muscle', 25, 1, 100),
  },
})

MovementSchema.index({ user: 1 })

module.exports = mongoose.model('movement', MovementSchema)
