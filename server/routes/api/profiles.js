const express = require('express')
const router = express.Router()

const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const { sanitize } = require('../../models/utils')

const getOrCreate = async user => {
  const session = await Profile.startSession()

  await session.withTransaction(async () => {
    let profile = await Profile.findOne({ user: user.id })

    if (!profile) {
      await Profile.create({ user: user.id })
    }
  })

  const profile = await Profile.findOne({ user: user.id })

  return {
    ...sanitize(profile.toObject()),
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    lastLogin: user.lastLogin,
    roles: user.roles,
    availableWeightUnits: Profile.weightUnits,
    availableLengthUnits: Profile.lengthUnits,
    availableWeekStartDays: Profile.weekStartDays,
  }
}

router.get('/me', [auth], (req, res) => res.send('auths route'))

module.exports = router
module.exports.getOrCreate = getOrCreate