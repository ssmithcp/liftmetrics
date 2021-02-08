const router = require('express-async-router').AsyncRouter()

const Weight = require('../../models/Weight')
const sanitize = require('../../models/sanitize')

const envelope = {
  data: [

  ],
  metadata: {
    start: 0,
  }
}

const get = (params) => {
  return envelope
}

router.get('/', (req, res) => {
  console.log('get weight with query: ')
  console.dir(req.query)
  res.json(get()).send()
})


router.post('/', async (req, res) => {
  console.log('adding weight')
  const source = req.body
  console.dir(source)

  const newWeight = await Weight.create({
    user: user.id,
    created: source.created,
    value: source.value,
    unit: source.unit,
   })

  res.json(sanitize(newWeight)).send()
})

module.exports = router