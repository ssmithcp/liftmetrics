const sanitize = require('./sanitize')

const envelope = (results, params, maxSize) => {
  const data = results.map(sanitize)
  const retVal = {
    data,
    metadata: {
      params,
    }
  }

  if (maxSize) {
    retVal.metadata.hasMore = maxSize === data.length
  }

  return retVal
}

module.exports = envelope