const formatError = message => ({
  errors: [{ message: message }]
})

module.exports.formatError = formatError

const formatErrors = errors => ({
  errors: errors.map(e => ({
    message: e.msg,
    path: e.param,
    value: e.param.toLowerCase() !== 'password' ? e.value : '[omitted]',
  }))
})

module.exports.formatErrors = formatErrors