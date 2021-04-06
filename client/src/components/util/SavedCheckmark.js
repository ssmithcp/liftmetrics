import { IconContext } from 'react-icons'
import { GoCheck } from 'react-icons/go'

const SavedCheckmark = () => (
  <div className='flex'>
    <IconContext.Provider value={{ className: 'text-green-700 ml-3 mr-1 w-6 h-6' }}>
      <GoCheck />
    </IconContext.Provider>
    <p>Saved!</p>
  </div>
)

export default SavedCheckmark