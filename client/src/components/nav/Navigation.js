import React from 'react'
import NavLink from './NavLink'

const NotLoggedIn = [
  {
    title: 'Sign Up',
    route: '/signup',
  },
  {
    title: 'Login',
    route: '/login'
  }
]

const Navigation = () => (
  <nav>
    <ul>
      { NotLoggedIn.map(item =>
        <NavLink key={ item.route } { ...item } />
      )}
    </ul>
  </nav>
)

export default Navigation