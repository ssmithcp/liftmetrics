const router = require('express-async-router').AsyncRouter()

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

module.exports = router