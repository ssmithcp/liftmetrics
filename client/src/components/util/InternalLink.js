import { NavLink } from 'react-router-dom'

import { Style } from './SafeExternalLink'

const InternalLink = ({ route, to, children, ...rest }) => (
  (route
    ? (
      <NavLink to={ route.path } className={ Style } { ...rest} >
        { route.title }
      </NavLink>
    )
    : (
      <NavLink to={ to } className={ Style } { ...rest} >
        { children }
      </NavLink>
    )
  )
)

export default InternalLink