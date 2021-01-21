import React from 'react'
import { NavLink } from 'react-router-dom'

import { Style } from './SafeExternalLink'

const InternalLink = ({ to, children, ...rest }) => (
  <NavLink to={ to } className={ Style } { ...rest} >
    { children }
  </NavLink>
)

export default InternalLink