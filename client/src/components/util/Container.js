import React from 'react'

const Container = ({ children, className }) => (
  <div className={ `container mx-auto my-2 ${className}` }>
    { children }
  </div>
)

export default Container