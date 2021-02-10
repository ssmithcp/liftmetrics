const router = require('express-async-router').AsyncRouter()

const returnCollection = require('../../util/returnCollection')

const Weight = require('../../models/Weight')
const sanitize = require('../../models/sanitize')

router.get('/',
  returnCollection.validate,
  async (req, res) => {
    console.log('get weights with query:', req.query)
    await returnCollection(Weight, req, res)
  }
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding weight', source)

  const newWeight = await Weight.create({
    user: res.locals.user.id,
    ...source,
  })

  res.json(sanitize(newWeight)).send()
})

module.exports = router