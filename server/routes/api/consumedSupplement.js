const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const ConsumedSupplement = require('../../models/ConsumedSupplement')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  returnCollection(ConsumedSupplement)
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding consumed supplement', source)

  const newConsumedSupplement = await ConsumedSupplement.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newConsumedSupplement))
})

module.exports = router