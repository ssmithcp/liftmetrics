import React from 'react'

export const Style = 'underline text-blue-500 cursor-pointer'

const SafeExternalLink = ({ target, children }) => (
  <a href={ target } target='_blank' rel='noopener noreferrer' className={ Style }>
    { children }
  </a>
)

export default SafeExternalLink