const { query, validationResult } = require('express-validator')

const { formatErrors } = require('./errorFormat')

const envelope = require('../models/envelope')

const returnCollection = async (model, req, res) => {
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

  const results = await model.find(filters)

  res.json(envelope(results, req.query)).send()
}

module.exports = returnCollection

const validate = [
  query('startDate').optional().isISO8601().withMessage('Start date is not valid'),
  query('endDate').optional().isISO8601().withMessage('End date is not valid'),
]

module.exports.validate = validate