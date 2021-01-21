import React from 'react'

const Input = ({ className, ...args }) => (
  <input
    className={ `my-3 p-3 border-b border-soft-black ${className}` }
    {...args}
  />
)

export default Input;