const router = require('express-async-router').AsyncRouter()

const MeasurementSite = require('../../models/MeasurementSite')
const getWithPreloads = require('../../util/getWithPreloads')
const sanitize = require('../../models/sanitize')

router.get('/', getWithPreloads(MeasurementSite))

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding measurement site', source)

  const newMeasurement = await MeasurementSite.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newMeasurement))
})

module.exports = router