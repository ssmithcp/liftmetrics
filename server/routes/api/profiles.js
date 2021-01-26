const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Profile = require('../../models/Profile')
const auth = require('../../middleware/auth')
const { sanitize } = require('../../models/utils')

const getOrCreate = async userId => {
  console.log('get or create profile', userId)
  const user = await User.findById(userId)

  let profile = await Profile.findOne({ user: user.id })
  if (!profile) {
    const session = await Profile.startSession()

    await session.withTransaction(async () => {
      profile = await Profile.findOne({ user: user.id })

      if (!profile) {
        profile = await Profile.create({ user: user.id })
      }
    })
  }

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

router.get('/me', [auth], async (req, res) => {
  const profile = await getOrCreate(req.user.id)
  res.json(profile).send()
})

module.exports = router
module.exports.getOrCreate = getOrCreate