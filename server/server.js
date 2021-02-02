const express = require('express')
const path = require('path')
const helmet = require('helmet')

const connectDB = require('./models/db')
const config = require('./config')

const app = express()

app.use(helmet())
// doesn't seem to work, still seeing powered by Express  in headers :shrugs:
app.disable('x-powered-by')

app.use(express.json({ extended: false }))

connectDB()

const urlPrefix = config.get('urlPrefix')

app.use(urlPrefix + '/auth', require('./routes/api/auth'))
app.use(urlPrefix + '/profile', require('./routes/api/profile'))

if (!config.get('isDev')) {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
  app.get('*', (req, res) => {
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