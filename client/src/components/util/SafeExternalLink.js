import React from 'react'

export const Style = 'text-primary cursor-pointer hover:underline'

const SafeExternalLink = ({ to, children, ...rest }) => (
  <a href={ to } target='_blank' rel='noopener noreferrer' className={ Style } { ...rest }>
    { children }
  </a>
)

export default SafeExternalLink