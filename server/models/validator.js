const validate = require('mongoose-validator')

const namedLength = (name, minLength, maxLength) => (
  validate({
    validator: 'isLength',
    arguments: [minLength, maxLength],
    message: `${ name } should be between {ARGS[0]} and {ARGS[1]} characters`,
  })
)

const namedAlphaNumeric = name => (
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: `${ name } can only contain alpha-numeric characters`,
  })
)

const alphaString = (name, minLength, maxLength) => [
  namedLength(name, minLength, maxLength),
  namedAlphaNumeric(name),
]

module.exports = {
  alphaString,
  namedLength,
}