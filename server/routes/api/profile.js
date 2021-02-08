const router = require('express-async-router').AsyncRouter()
const gravatar = require('gravatar')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

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

  return {
    ...profileSanitize(profile),
    firstName: user.firstName,
    lastName: user.lastName,
    lastLogin: user.lastLogin,
    roles: user.roles,
    availableWeightUnits: Profile.weightUnits,
    availableLengthUnits: Profile.lengthUnits,
  }
}

router.get('/me', async (req, res) => {
  const profile = await getOrCreate(res.locals.user.id)
  res.json(profile).send()
})

module.exports = router
module.exports.getOrCreate = getOrCreate