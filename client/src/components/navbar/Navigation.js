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
        <NavLink
          // this prop is ignored but key set explicitly in NavLink
          // this is here to avoid react warning
          key={ item.path }
          { ...item }
        />
      )}
    </ul>
  </nav>
)

export default Navigation