const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
  try {
    await mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connected to mongo db')
  } catch (e) {
    console.error('connecting to mongo db', e)
    process.exit(1)
  }
}

module.exports = connectDB