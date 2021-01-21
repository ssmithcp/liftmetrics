import React from 'react'

export const Style = 'text-primary cursor-pointer hover:underline'

const SafeExternalLink = ({ target, children }) => (
  <a href={ target } target='_blank' rel='noopener noreferrer' className={ Style }>
    { children }
  </a>
)

export default SafeExternalLink