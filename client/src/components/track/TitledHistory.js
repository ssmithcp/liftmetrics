import { NavLink } from 'react-router-dom'

import EditPencil from './EditPencil'
import StripedRow from './StripedRow'

const TitledHistory = ({ title, rowData, toPath, renderName, renderDescription }) => (
  <div>
    <h2 className='text-xl mb-4'>{ title }</h2>
    <div>
      { rowData.map((e, index) => (
          <StripedRow
            key={ e.created }
            index={ rowData.length - index }
          >
            <NavLink
              exact
              to={ toPath(e) }
              className='p-2 flex justify-between md:grid md:grid-cols-2'
            >
              <div className='flex items-center -ml-3 md:ml-0'>
                <EditPencil />
                <p className='md:pl-4'>
                  { renderName(e) }
                </p>
              </div>
              <div className='flex items-center text-right md:text-left'>
                { renderDescription(e) }
              </div>
            </NavLink>
          </StripedRow>
      ))}
    </div>
  </div>
)

export default TitledHistory