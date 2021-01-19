const sanitize = res => {
  const copy = {
    ...res
  }

  delete copy._id
  delete copy.__v

  return copy
}

module.exports = {
  sanitize
}