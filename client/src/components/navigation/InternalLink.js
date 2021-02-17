import { NavLink } from 'react-router-dom'

import { Style } from './SafeExternalLink'

const InternalLink = ({ route, to, children, className = '', ...rest }) => (
  (route
    ? (
      <NavLink to={ route.path } className={ `${ Style } ${ className }` } { ...rest } >
        { route.title }
      </NavLink>
    )
    : (
      <NavLink to={ to } className={ `${ Style } ${ className }` } { ...rest } >
        { children }
      </NavLink>
    )
  )
)

export default InternalLink