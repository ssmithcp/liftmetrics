import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import routes from './index'

const NotLoggedIn = [
  routes.signUp,
  routes.login,
  routes.about,
]

const LoggedIn = [
  routes.home,
  routes.trackHome,
  routes.analyzeHome,
]

const NavLinks = ({ profile }) => {
  const navItems = profile !== null ? LoggedIn : NotLoggedIn

  return (
    <nav>
      <ul className='flex items-center'>
        { navItems.map(item =>
          <li key={ item.path } className='p-3 text-lg hover:text-primary md:py-6'>
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
                title={ routes.profile.title }
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

export default connect(mapStateToProps)(NavLinks)