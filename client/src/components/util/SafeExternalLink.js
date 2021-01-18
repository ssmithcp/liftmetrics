import React from 'react'

const SafeExternalLink = ({ target, children }) => (
  <a href={ target } target='_blank' rel="noopener noreferrer">
    { children }
  </a>
)

export default SafeExternalLink