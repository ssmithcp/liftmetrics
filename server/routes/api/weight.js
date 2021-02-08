const router = require('express-async-router').AsyncRouter()
const { query, validationResult } = require('express-validator')

const Weight = require('../../models/Weight')
const sanitize = require('../../models/sanitize')
const envelope = require('../../models/envelope')

router.get('/',
  query('startDate').isDate().withMessage('Start date is not valid'),
  query('endDate').isDate().withMessage('End date is not valid'),
  async (req, res) => {
    console.log('get weights with query: ')
    console.dir(req.query)

    const filters = {
      user: res.locals.user.id,
      created: {},
    }

    if (req.query.startDate) {
      filters.created['$gte'] = req.query.startDate
    }
    if (req.query.endDate) {
      filters.created['$lte'] = req.query.endDate
    }

    const results = await Weight.find(filters)

    res.json(envelope(results, req.query)).send()
  }
)

router.post('/', async (req, res) => {
  const source = req.body
  console.log('adding weight', source)

  const newWeight = await Weight.create({
    user: res.locals.user.id,
    created: source.created,
    value: source.value,
    unit: source.unit,
   })

  res.json(sanitize(newWeight)).send()
})

module.exports = router