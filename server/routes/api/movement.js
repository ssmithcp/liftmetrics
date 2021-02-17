const router = require('express-async-router').AsyncRouter()
const _ = require('lodash')
const { param } = require('express-validator')

const Movement = require('../../models/Movement')
const getWithPreloads = require('../../util/getWithPreloads')
const sanitize = require('../../models/sanitize')

router.get('/', getWithPreloads(Movement))

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding movement', source)

  const newWeight = await Movement.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newWeight))
})

router.put('/:id',
  param('id').notEmpty(),
  async (req, res) => {
    const source = req.body
    const userId = res.locals.user.id
    console.log('updating movement', source)

    const updatedMovement = await Movement.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      _.pick(source, ['name', 'type', 'targetedMuscles', 'modifiers']),
      { new: true, runValidators: true }
    )

    res.json(sanitize(updatedMovement))
  }
)

module.exports = router