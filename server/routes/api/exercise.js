const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const Exercise = require('../../models/Exercise')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  async (req, res) => {
    console.log('get exercises with query:', req.query)
    await returnCollection(Exercise, req, res)
  }
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding exercise', source)

  const newExercise = await Exercise.create({
    user: res.locals.user.id,
    movement: source.movement,
    sets: source.sets,
    reps: source.reps,
    value: source.value,
    unit: source.unit,
    note: source.note,
  })

  res.json(sanitize(newExercise)).send()
})

module.exports = router