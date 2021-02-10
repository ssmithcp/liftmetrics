const router = require('express-async-router').AsyncRouter()

const Movement = require('../../models/Movement')
const envelope = require('../../models/envelope')

router.get('/', async (req, res) => {
  const userId = res.locals.user.id
  let movements = await Movement.find({ user: userId })

  if (movements.length === 0) {
    const session = await Movement.startSession()

    await session.withTransaction(async () => {
      movements = await Movement.find({ user: userId })

      if (movements.length === 0) {
        const promises = Movement.preloads.map(m => Movement.create({
          user: userId,
          ...m,
        }))

        await Promise.all(promises)
        movements = await Movement.find({ user: userId })
      }
    })
  }

  res.json(envelope(movements, req.query)).send()
})

module.exports = router