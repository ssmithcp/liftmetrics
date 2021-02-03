const formatError = message => ({
  errors: [{ message: message }]
})

module.exports.formatError = formatError