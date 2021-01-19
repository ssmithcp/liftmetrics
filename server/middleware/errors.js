const { validationResult } = require('express-validator')

const withoutErrors = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

// copied from express-async-handler
const asyncHandler = fn =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args)
    const next = args[args.length-1]
    return Promise.resolve(fnReturn).catch(next)
  }

module.exports = {
  withoutErrors,
  asyncHandler,
}