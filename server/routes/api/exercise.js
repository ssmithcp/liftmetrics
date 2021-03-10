const router = require('express-async-router').AsyncRouter()
const _ = require('lodash')
const { param } = require('express-validator')

const returnCollection = require('../../util/returnCollection')

const Exercise = require('../../models/Exercise')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  returnCollection(Exercise)
)

router.get('/:id',
  param('id').notEmpty(),
  async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)
    res.json(sanitize(exercise))
  }
)

router.put('/:id',
  param('id').notEmpty(),
  async (req, res) => {
    const source = req.body
    const userId = res.locals.user.id
    console.log('updating exercise', source)

    const updatedExercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      _.pick(source, ['movement', 'sets', 'reps', 'value', 'unit', 'note']),
      { new: true, runValidators: true }
    )

    res.json(sanitize(updatedExercise))
  }
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding exercise', source)

  const newExercise = await Exercise.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newExercise))
})

module.exports = router