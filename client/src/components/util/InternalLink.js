import React from 'react'
import { NavLink } from 'react-router-dom'

import { Style } from './SafeExternalLink'

const InternalLink = ({ to, children }) => (
  <NavLink to={ to } className={ Style }>
    { children }
  </NavLink>
)

export default InternalLink