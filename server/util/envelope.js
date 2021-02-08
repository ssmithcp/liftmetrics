const sanitize = result => {
  const copy = {
    ...result.toObject()
  }

  delete copy.__v
  delete copy.user

  copy.id = copy._id
  delete copy._id

  return copy
}

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