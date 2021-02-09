import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { IconContext } from 'react-icons'

import routes from './index'
import Icon from './Icon'

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
          <li key={ item.path }>
            <NavLink exact to={ item.path } className='block p-3 text-lg hover:text-primary md:py-6' activeClassName='current'>
              <IconContext.Provider
                value={{ className: 'text-gray-700 p-2 w-14 h-14 mx-2 md:hidden' }}
              >
                <Icon name={ item } />
              </IconContext.Provider>
              <p className='hidden md:block'>{ item.title }</p>
            </NavLink>
          </li>
        )}
        { profile !== null && profile.avatar && (
          <li key='profile avatar'>
            <NavLink exact to={ routes.profile.path } activeClassName='current'>
              <img
                src={ profile.avatar }
                title={ routes.profile.title }
                alt='avatar'
                className='ml-5 block w-14 h-14 rounded-full border-2 border-transparent hover:border-blue-400 md:ml-3 md:w-11 md:h-11'
              />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(NavLinks)