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
  const isLoggedIn = profile !== null
  const navItems = isLoggedIn ? LoggedIn : NotLoggedIn

  return (
    <nav>
      <ul className='flex items-center'>
        { navItems.map(item =>
          <li key={ item.path }>
            <NavLink exact to={ item.path } className='block p-3 text-lg hover:text-primary md:py-6'>
              { isLoggedIn && (
                <>
                <IconContext.Provider value={{ className: 'text-gray-600 p-2 w-12 h-12 md:hidden' }}>
                  <Icon name={ item } />
                </IconContext.Provider>
                <p className='hidden md:block'>{ item.title }</p>
                </>
              )}
              { !isLoggedIn && <p>{ item.title }</p>}
            </NavLink>
          </li>
        )}
        { isLoggedIn && profile.avatar && (
          <li key='profile avatar'>
            <NavLink exact to={ routes.profile.path }>
              <img
                src={ profile.avatar }
                title={ routes.profile.title }
                alt='avatar'
                className='ml-3 block w-12 h-12 rounded-full border-2 border-transparent hover:border-blue-400 md:w-11 md:h-11'
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