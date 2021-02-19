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

const isWeightUnit = namedEnum('Weight', units.weight)
const isLengthUnit = namedEnum('Length', units.length)

const floatInRange = (name, min, max) => ({
  validator: v => validate.isFloat(v.toString(), { min, max }),
  message: `${ name } must be a decimal between ${ min } and ${ max }`,
})

const weightInRange = floatInRange('Weight', 0.0, 5000.0)

const lengthInRange = floatInRange('Length', 0.0, 5000.0)

const intInRange = (name, min, max) => ({
  validator: v => validate.isInt(v.toString(), { min,  max }),
  message: `${ name } must be a whole number between ${ min } and ${ max }`,
})

const arrayLength = (name, arrayMax) => ({
  validator: a => Array.isArray(a) && a.length < arrayMax,
  message: `${ name } must be ${ arrayMax } items or less.`,
})

const arrayItemLength = (name, lengthMin, lengthMax) => ({
  validator: a => Array.isArray(a) && a.every(s => s.length >= lengthMin && s.length <= lengthMax),
  message: `${ name }s must between ${ lengthMin } and ${ lengthMax } characters`,
})

const freeformArray = (name, arrayMax, lengthMin, lengthMax) => ([
  arrayLength(name, arrayMax),
  arrayItemLength(name, lengthMin, lengthMax),
])

const toLower = n => n.toLowerCase()

const toLowerList = l => l.map(toLower)

module.exports = {
  alphaString,
  namedLength,
  namedEnum,
  namedEnumList,
  isWeightUnit,
  isLengthUnit,
  floatInRange,
  weightInRange,
  lengthInRange,
  intInRange,
  freeformArray,
  toLower,
  toLowerList,
}