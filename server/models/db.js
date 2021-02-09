const mongoose = require('mongoose')

const config = require('../config')

const connect = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'),
    {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
      useUnifiedTopology: true,
      autoIndex: true,
		})
    console.log('connected to mongo db')
  } catch (e) {
    console.error('connecting to mongo db', e)
    process.exit(1)
  }
}

module.exports.connect = connect

const validationError = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.keys(err.errors)
      .map(k => err.errors[k])
      .map(e => ({
        message: e.properties.message,
        path: e.properties.path,
        value: e.properties.value,
      }))

    res.status(400).json({ errors })
  } else {
    next(err)
  }
}

module.exports.validationError = validationError