const router = require('express-async-router').AsyncRouter()

const MeasurementSite = require('../../models/MeasurementSite')
const sanitize = require('../../models/sanitize')
const envelope = require('../../models/envelope')

router.get('/site', async (req, res) => {
  const userId = res.locals.user.id
  let definitions = await MeasurementSite.find({ user: userId })

  if (definitions.length === 0) {
    const session = await MeasurementSite.startSession()

    await session.withTransaction(async () => {
      definitions = await MeasurementSite.find({ user: userId })

      if (definitions.length === 0) {
        const promises = MeasurementSite.preloads.map(m => MeasurementSite.create({
          user: userId,
          ...m,
        }))

        await Promise.all(promises)
        definitions = await MeasurementSite.find({ user: userId })
      }
    })
  }

  res.json(envelope(definitions, req.query))
})

router.post('/site', async (req, res) => {
  const source = req.body
  console.log('adding measurement site', source)

  const newMeasurement = await MeasurementSite.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newMeasurement))
})

module.exports = router