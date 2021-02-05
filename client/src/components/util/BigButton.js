import { base } from './Button'

export const style = `${ base } my-3 text-xl py-4 w-full md:w-2/4`

const BigButton = ({ className, children, ...rest }) => (
  <div className='text-center my-6'>
    <button
      className={ style + (className || '') }
      { ... rest }
    >
      { children }
    </button>
  </div>
)

export default BigButton