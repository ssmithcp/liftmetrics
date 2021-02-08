const sanitize = res => {
  const copy = {
    ...res.toObject()
  }

  delete copy._id
  delete copy.__v
  delete copy.user

  return copy
}

module.exports = sanitize


