const mongoose = require('mongoose')
const validator = require('./validator')

const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  movement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movement',
    required: true,
  },
  sets: {
    type: Number,
    required: true,
    validate: validator.intInRange('Sets', 1, 1000)
  },
  reps: {
    type: Number,
    required: true,
    validate: validator.intInRange('Reps', 1, 1000)
  },
  value: {
    type: Number,
    required: true,
    validate: validator.weightInRange,
  },
  unit: {
    type: String,
    required: true,
    validate: validator.isWeightUnit,
  },
  note: {
    type: String,
    validate: validator.namedLength('note', 1, 1024)
  },
})

ExerciseSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('exercise', ExerciseSchema)
