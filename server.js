const express = require('express')
const connectDB = require('./config/db')
const config = require('config')

const app = express()
app.use(express.json({ extended: false }))

connectDB()

const urlPrefix = config.get('urlPrefix')

app.get('/', (req, res) => res.send('API '))

app.use(urlPrefix + '/auth', require('./routes/api/auth'))
app.use(urlPrefix + '/users', require('./routes/api/users'))

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})