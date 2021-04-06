import DebouncedInput from './DebouncedInput'
import DecimalInput from './DecimalInput'

const DebouncedDecimalInput = ({ ...rest }) => (
  <DebouncedInput
    Input={ DecimalInput }
    { ...rest }
  />
)

export default DebouncedDecimalInput