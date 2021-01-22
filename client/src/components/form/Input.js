import React from 'react'

const Input = ({ className, ...args }) => (
  <input
    className={ `my-3 p-3 focus:outline-none border-b focus:border-b-2 border-black ${className || ''}` }
    {...args}
  />
)

export default Input;