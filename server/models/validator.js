const validate = require('validator')

const units = require('./units')

const namedLength = (name, minLength, maxLength) => ({
  validator: s => validate.isLength(s, { min: minLength, max: maxLength }),
  message: `${ name } should be between ${ minLength } and ${ maxLength } characters`,
})

const namedAlphaNumeric = name => ({
  validator: validate.isAlphanumeric,
  message: () => `${ name } can only contain alpha-numeric characters`
})

const alphaString = (name, minLength, maxLength) => [
  namedLength(name, minLength, maxLength),
  namedAlphaNumeric(name),
]

const namedEnum = (name, values) => ({
  validator: val => values.some(v => val === v),
  message: `${ name } should be one of the following: ${ values.join(', ') }`
})

const namedEnumList = (name, values) => ({
  validator: enums => enums.every(e => values.includes(e)),
  message: `${ name } should be one of the following: ${ values.join(', ') }`
})

const isWeightUnit = () => namedEnum('Weight', units.weight)
const isLengthUnit = () => namedEnum('Length', units.length)

const isWeight = () => ({
  validator: v => validator.isFloat(v, 0.0, 5000.0),
  message: 'Weight must be a decimal between 0 and 5000',
})

module.exports = {
  alphaString,
  namedLength,
  namedEnum,
  namedEnumList,
  isWeightUnit,
  isLengthUnit,
  isWeight,
}