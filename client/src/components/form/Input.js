const Input = ({ className, ...args }) => (
  <input
    className={ `my-3 p-3 focus:outline-none border-b border-gray-400 focus:border-black ${className || ''}` }
    {...args}
  />
)

export default Input