import { connect, useSelector } from 'react-redux'

import { update } from '../../actions/profile'
import { logout } from '../../actions/user'

import WithSavedNotification from '../util/WithSavedNotification'
import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'
import ResponsiveDate from '../track/ResponsiveDate'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const SavingOptions = ({ current, options, doUpdate }) => ({ savedNotification }) => (
  <select
    className='w-16 md:w-52'
    value={ current }
    onChange={ e => doUpdate(e.target.value).then(savedNotification) }
  >
    { options.map(o =>
      <option key={ o } value={ o }>
        { o }
      </option>
    )}
  </select>
)

const Profile = ({ update, logout }) => {
  const profile = useSelector(s => s.profile)

  const { firstName, lastName } = profile

  return <TitledPage title={ `Profile for ${ firstName } ${ lastName[0].toUpperCase() }` }>
    <div className='my-6 text-lg grid gap-2 grid-cols-profile'>
      <p>First name</p>
      <p>{ firstName }</p>
      <p>Last name</p>
      <p>{ lastName }</p>
      <p>Weight unit</p>
      <WithSavedNotification Saveable={
          SavingOptions({
            doUpdate: val => update({ weightUnit: val }),
            current: profile.weightUnit,
            options: profile.availableWeightUnits,
          })
        }
      />
      <p>Length unit</p>
      <WithSavedNotification Saveable={
          SavingOptions({
            doUpdate: val => update({ lengthUnit: val }),
            current: profile.lengthUnit,
            options: profile.availableLengthUnits,
          })
        }
      />
      <p>Week start day</p>
      <WithSavedNotification Saveable={
          SavingOptions({
            doUpdate: val => update({ weekStartDay: days.indexOf(val) }),
            current: days[profile.weekStartDay === undefined ? 1 : profile.weekStartDay],
            options: days,
          })
        }
      />
      <p>Last login</p>
      <ResponsiveDate date={ profile.lastLogin } />
    </div>

    <BigButton onClick={ logout }>
      Logout!
    </BigButton>
  </TitledPage>
}

export default connect(null, { update, logout })(Profile)