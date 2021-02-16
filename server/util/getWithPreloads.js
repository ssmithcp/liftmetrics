const envelope = require('../models/envelope')

const getWithPreloads = model => async (req, res) => {
  const userId = res.locals.user.id
  let records = await model.find({ user: userId })

  if (records.length === 0) {
    const session = await model.startSession()

    await session.withTransaction(async () => {
      records = await model.find({ user: userId })

      if (records.length === 0) {
        const promises = model.preloads.map(m => model.create({
          user: userId,
          ...m,
        }))

        await Promise.all(promises)
        records = await model.find({ user: userId })
      }
    })
  }

  res.json(envelope(records, req.query))
}

module.exports = getWithPreloads