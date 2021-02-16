const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const Exercise = require('../../models/Exercise')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  returnCollection(Exercise)
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