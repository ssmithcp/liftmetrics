const mongoose = require('mongoose')
const validator = require('./validator')

const ExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  movement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movement',
  },
  sets: {
    type: Number,
    required: true,
    validator: validator.intInRange('Sets', 1, 1000)
  },
  reps: {
    type: Number,
    required: true,
    validator: validator.intInRange('Reps', 1, 1000)
  },
  value: {
    type: Number,
    required: true,
    validator: validator.weightInRange,
  },
  unit: {
    type: String,
    required: true,
    validator: validator.isWeightUnit,
  },
  note: {
    type: String,
    validator: validator.namedLength('note', 1, 1024)
  },
})

ExerciseSchema.index({ user: 1, created: -1 })

module.exports = mongoose.model('exercise', ExerciseSchema)
