const express = require('express')
const path = require('path')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const db = require('./models/db')
const config = require('./config')
const auth = require('./middleware/auth')

const app = express()

app.use(helmet({
  contentSecurityPolicy: false,
}))
// doesn't seem to work, still seeing powered by Express in headers :shrugs:
app.disable('x-powered-by')

app.use(express.json({ extended: false }))
app.use(cookieParser())
app.use(morgan('combined'))

db.connect()

const urlPrefix = config.get('urlPrefix')

// all endpoints except /user/* endpoints need to be authorized
app.use(urlPrefix + '/user', require('./routes/api/user'))

app.use(urlPrefix, auth)
app.use(urlPrefix + '/profile', require('./routes/api/profile'))
app.use(urlPrefix + '/weight', require('./routes/api/weight'))
app.use(urlPrefix + '/movement', require('./routes/api/movement'))
app.use(urlPrefix + '/exercise', require('./routes/api/exercise'))

/* global __dirname, process */

if (!config.get('isDev')) {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.use(db.validationError)

app.use((err, req, res, _next) => {
  console.error('uncaught error:', err)
  res.status(500).send('internal error')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`environment is '${process.env.NODE_ENV}' isDev '${config.get('isDev')}'`)
  console.log(`server started on port ${port}`)
})