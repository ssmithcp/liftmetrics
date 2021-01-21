import React from 'react'
import NavLink from './NavLink'

import routes from './index'

const NotLoggedIn = [
  routes.signUp,
  routes.login,
  routes.about,
]

const Navigation = ({ className }) => (
  <nav className={ className }>
    <ul>
      { NotLoggedIn.map(item =>
        <NavLink key={ item.route }{ ...item } />
      )}
    </ul>
  </nav>
)

export default Navigation