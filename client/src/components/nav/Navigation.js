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
  <ul>
    { NotLoggedIn.map(item =>
      <NavLink key={ item.route } { ...item } />
    )}
  </ul>
)

export default Navigation