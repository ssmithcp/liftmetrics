const router = require('express-async-router').AsyncRouter()
const { query, validationResult } = require('express-validator')

const Exercise = require('../../models/Exercise')
const sanitize = require('../../models/sanitize')
const envelope = require('../../models/envelope')

router.get('/',
  async (req, res) => {
    const filters = {
      user: res.locals.user.id,
      created: {},
    }

    res.json(envelope({}, req.query))
  }
)

router.post('/', async (req, res) => {
  const source = req.body

  res.json(envelope({}, req.query))
})

module.exports = router