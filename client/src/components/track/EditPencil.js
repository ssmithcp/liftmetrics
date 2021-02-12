import { IconContext } from 'react-icons'
import { BiPencil } from 'react-icons/bi'

const EditPencil = () => (
  <IconContext.Provider value={{ className: 'text-green-700 py-3 w-12 h-12' }}>
    <BiPencil
      className='cursor-pointer'
      title='Edit'
    />
  </IconContext.Provider>
)

export default EditPencil