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

// all endpoints except /users/* endpoints need to be authorized
app.use(urlPrefix + '/users', require('./routes/api/user'))

app.use(urlPrefix, auth)
app.use(urlPrefix + '/profiles', require('./routes/api/profile'))
app.use(urlPrefix + '/weights', require('./routes/api/weight'))
app.use(urlPrefix + '/movements', require('./routes/api/movement'))
app.use(urlPrefix + '/exercises', require('./routes/api/exercise'))
app.use(urlPrefix + '/sites', require('./routes/api/measurementSite'))
app.use(urlPrefix + '/sites/measurements', require('./routes/api/measurement'))
app.use(urlPrefix + '/supplements', require('./routes/api/supplement'))
app.use(urlPrefix + '/supplements/consumed', require('./routes/api/consumedSupplement'))

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