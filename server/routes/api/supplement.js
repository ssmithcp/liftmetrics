const router = require('express-async-router').AsyncRouter()

const Supplement = require('../../models/Supplement')
const getWithPreloads = require('../../util/getWithPreloads')
const sanitize = require('../../models/sanitize')

router.get('/', getWithPreloads(Supplement))

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding supplement', source)

  const newSupplement = await Supplement.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newSupplement))
})

module.exports = router