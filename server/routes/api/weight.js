const router = require('express-async-router').AsyncRouter()
const { query, validationResult } = require('express-validator')

const { formatErrors } = require('../../util/errorFormat')

const Weight = require('../../models/Weight')
const sanitize = require('../../models/sanitize')
const envelope = require('../../models/envelope')

router.get('/',
  query('startDate').optional().isISO8601().withMessage('Start date is not valid'),
  query('endDate').optional().isISO8601().withMessage('End date is not valid'),
  async (req, res) => {
    console.log('get weights with query: ')
    console.dir(req.query)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json(formatErrors(errors.array()))
    }

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