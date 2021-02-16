const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const Weight = require('../../models/Weight')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  returnCollection(Weight)
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding weight', source)

  const newWeight = await Weight.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newWeight))
})

module.exports = router