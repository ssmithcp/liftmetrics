const router = require('express-async-router').AsyncRouter()
const gravatar = require('gravatar')
const _ = require('lodash')

const User = require('../../models/User')
const Profile = require('../../models/Profile')
const units = require('../../models/units')

const profileSanitize = res => {
  const copy = {
    ...res.toObject()
  }

  delete copy._id
  delete copy.__v
  delete copy.user

  return copy
}

const getOrCreate = async userId => {
  console.log('get or create profile', userId)
  const user = await User.findById(userId)

  let profile = await Profile.findOne({ user: user.id })
  if (!profile) {
    const session = await Profile.startSession()

    await session.withTransaction(async () => {
      profile = await Profile.findOne({ user: user.id })

      if (!profile) {
        const avatar = gravatar.url(user.email, {
          s: '200',
          r: 'pg',
          d: 'monsterid'
        }, true)

        profile = await Profile.create({
          user: user.id,
          avatar,
         })
      }
    })
  }

  return wrap(profile, user)
}

const wrap = (profile, user) => ({
  ...profileSanitize(profile),
  firstName: user.firstName,
  lastName: user.lastName,
  lastLogin: user.lastLogin,
  roles: user.roles,
  availableWeightUnits: units.weight,
  availableLengthUnits: units.length,
})

router.get('/me', async (req, res) => {
  const profile = await getOrCreate(res.locals.user.id)
  res.json(profile).send()
})

router.put('/me', async (req, res) => {
  const source = req.body
  const userId = res.locals.user.id
  console.log('updating profile', source)

  const updatedProfile = await Profile.findOneAndUpdate(
    { user: userId },
    _.pick(source, ['weightUnit', 'lengthUnit']),
    { new: true, runValidators: true }
  )

  const user = await User.findById(userId)
  res.json(wrap(updatedProfile, user)).send()
})

module.exports = router
module.exports.getOrCreate = getOrCreate