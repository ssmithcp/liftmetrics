import { style } from '../util/BigButton'

const SubmitButton = ({ className, ...rest }) => (
  <div className='text-center my-6'>
    <input
      type='submit'
      className={ style + (className || '') }
      { ... rest }
    />
  </div>
)

export default SubmitButton