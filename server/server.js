const express = require('express')
const path = require('path')
const connectDB = require('./models/db')
const config = require('./config')

const app = express()
app.use(express.json({ extended: false }))

connectDB()

const urlPrefix = config.get('urlPrefix')

app.use(urlPrefix + '/auth', require('./routes/api/auth'))
app.use(urlPrefix + '/users', require('./routes/api/users'))
app.use(urlPrefix + '/profiles', require('./routes/api/profiles'))

if (!config.get('isDev')) {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.use((err, req, res, next) => {
  console.error('uncaught error:', err)
  res.status(500).send('internal error')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`environment is '${process.env.NODE_ENV}' isDev '${config.get('isDev')}'`)
  console.log(`server started on port ${port}`)
})