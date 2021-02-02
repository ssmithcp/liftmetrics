const sanitize = res => {
  const copy = {
    ...res
  }

  delete copy._id
  delete copy.__v
  delete copy.user

  return copy
}

module.exports = {
  sanitize
}