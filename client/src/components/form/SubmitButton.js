import { style } from '../util/BigButton'

const SubmitButton = ({ className, ...rest }) => (
  <input
    type='submit'
    className={ style + (className || '') }
    { ... rest }
  />
)

export default SubmitButton