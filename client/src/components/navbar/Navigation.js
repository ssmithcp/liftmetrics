import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import routes from './index'

const NotLoggedIn = [
  routes.signUp,
  routes.login,
  routes.about,
]

const LoggedIn = [
  routes.trackHome,
  routes.analyzeHome,
]

const Navigation = ({ profile }) => {
  const navItems = profile !== null ? LoggedIn : NotLoggedIn

  return (
    <nav>
      <ul className='flex items-center'>
        { navItems.map(item =>
          <li key={ item.path } className='p-3 text-lg hover:text-primary'>
            <NavLink exact to={ item.path } activeClassName='current'>
              { item.title }
            </NavLink>
          </li>
        )}
        { profile !== null && profile.avatar && (
          <li key='profile avatar' className='pl-3'>
            <NavLink exact to={ routes.profile.path } activeClassName='current'>
              <img
                src={ profile.avatar }
                alt='avatar'
                className='w-10 h-10 rounded-full'
              />
            </NavLink>
          </li>
        )}
        {/* XXX add handling in case avatar is null somehow? */}
      </ul>
    </nav>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Navigation)