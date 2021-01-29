export const style =
  `my-3 text-xl bg-white cursor-pointer focus:outline-none border border-gray-400
  hover:border-black focus:border-black
  py-4 w-full md:w-2/4`

const BigButton = ({ className, children, ...rest }) => (
  <button
    className={ style + (className || '') }
    { ... rest }
  >
    { children }
  </button>
)

export default BigButton