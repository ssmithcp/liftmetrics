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

module.exports = sanitize


