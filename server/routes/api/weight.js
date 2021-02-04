const express = require('express')
const router = express.Router()

const envelope = {
  data: [

  ],
  metadata: {
    start: 0,
  }
}

const get = (params) => {
  return envelope
}

router.get('/', (req, res) => {
  console.log('get weight with query: ')
  console.dir(req.query)
  res.json(get()).send()
})

module.exports = router