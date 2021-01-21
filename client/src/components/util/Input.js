import React from 'react'

const Input = ({ className, ...args }) => (
  <input
    className={ `my-3 p-3 border-b border-gray-700 ${className}` }
    {...args}
  />
)

export default Input;