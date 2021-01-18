import React from 'react'

const Container = ({ children, className }) => (
  <div className={ `container mx-auto px-2 md:px-4 ${className}` }>
    { children }
  </div>
)

export default Container