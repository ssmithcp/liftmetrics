const formatError = message => ({
  errors: [{ message: message }]
})

module.exports.formatError = formatError

const formatErrors = errors => ({
  errors
})

module.exports.formatErrors = formatErrors