const mongoose = require('mongoose')
const validator = require('./validator')

const types = [ 'primary', 'secondary', 'supplementary', 'accessory', 'other' ]

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
    validate: validator.namedLength('Name', 1, 100),
  },
  type: {
    type: String,
    required: true,
    validate: validator.namedEnum('Type', types),
  },
  targetedMuscles: {
    type: [String],
    default: [ ],
    validate: validator.freeformArray('Targeted muscle', 25, 1, 100),
  },
  modifiers: {
    type: [String],
    default: [ ],
    validate: validator.freeformArray('Modifier', 25, 1, 100),
  },
})

MovementSchema.index({ user: 1 })

module.exports = mongoose.model('movement', MovementSchema)

const movementPreloads = [
  {
    name: 'low bar back squat',
    type: 'primary',
    targetedMuscles: [ 'quad', 'hamstring', 'glute', 'back' ],
  },
  {
    name: 'bench',
    type: 'primary',
    targetedMuscles: [ 'chest', 'tricep' ],
    modifiers: [ 'paused' ]
  },
  {
    name: 'TNG bench',
    type: 'secondary',
    targetedMuscles: [ 'chest', 'tricep' ],
  },
  {
    name: 'overhead press',
    type: 'primary',
    targetedMuscles: [ 'shoulders' ],
  },
  {
    name: 'pull up',
    type: 'accessory',
    targetedMuscles: [ 'back' ],
  },
  {
    name: 'tricep kickback',
    type: 'accessory',
    targetedMuscles: [ 'tricep' ],
  },
  {
    name: 'barbell glute bridge',
    type: 'secondary',
    targetedMuscles: [ 'glute' ],
    modifiers: [ 'booty band' ],
  },
  {
    name: 'EZ bar curl',
    type: 'accessory',
    targetedMuscles: [ 'bicep' ],
  },
  {
    name: 'db bench',
    type: 'secondary',
    targetedMuscles: [ 'chest', 'tricep' ],
    modifiers: [ 'incline' ],
  },
  {
    name: 'EZ laying skull crusher',
    type: 'accessory',
    targetedMuscles: [ 'tricep' ],
  },
  {
    name: 'ab roller',
    type: 'accessory',
    targetedMuscles: [ 'abs' ],
  },
  {
    name: 'DB curl',
    type: 'accessory',
    targetedMuscles: [ 'bicep' ],
  },
  {
    name: 'reverse grip bench',
    type: 'secondary',
    targetedMuscles: [ 'chest', 'tricep' ],
  },
]

module.exports.preloads = movementPreloads