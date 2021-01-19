import React from 'react'
import NavLink from './NavLink'

const NOT_LOGGED_IN = [
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
  <ul>
    { NOT_LOGGED_IN.map(item =>
      <NavLink key={ item.route } { ...item } />
    )}
  </ul>
)

export default Navigation