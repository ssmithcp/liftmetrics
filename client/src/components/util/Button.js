export const base =
  `bg-white cursor-pointer focus:outline-none border border-gray-400
   hover:border-black focus:border-black`

export const style =
  `${ base } my-4 text-center py-3 px-8`

const Button = ({ className, children, ...rest }) => (
  <button
    className={ `${ style } ${ (className || '') }` }
    { ... rest }
  >
    { children }
  </button>
)

export default Button