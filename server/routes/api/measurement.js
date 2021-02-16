const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const Measurement = require('../../models/Measurement')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  returnCollection(Measurement)
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding measurement', source)

  const newMeasurement = await Measurement.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newMeasurement))
})

module.exports = router