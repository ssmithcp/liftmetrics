const express = require('express')
const connectDB = require('./models/db')
const config = require('./util/config')

const app = express()
app.use(express.json({ extended: false }))

connectDB()

const urlPrefix = config.get('urlPrefix')

app.use(urlPrefix + '/auth', require('./routes/api/auth'))
app.use(urlPrefix + '/users', require('./routes/api/users'))

app.use((err, req, res, next) => {
  console.error('uncaught error:', err)
  res.status(500).send('internal error')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})