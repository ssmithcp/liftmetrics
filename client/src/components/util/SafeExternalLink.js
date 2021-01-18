import React from 'react'

const SafeExternalLink = ({ target, children }) => (
  <a href={ target } target='_blank' rel='noopener noreferrer' className='underline text-blue-500 cursor-pointer'>
    { children }
  </a>
)

export default SafeExternalLink