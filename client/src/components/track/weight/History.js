import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { IconContext } from 'react-icons'
import { BiPencil } from 'react-icons/bi'

import routes from '../../navigation'
import { normalize } from '../../../util/weight'
import { round } from './Trends'
import ResponsiveDate from '../ResponsiveDate'

const History = () => {
  const unit = useSelector(s => s.profile.weightUnit)
  const weights = useSelector(s => s.weight)
    .map(w => normalize(w, unit))
    .sort((a, b) => b.created.getTime() - a.created.getTime())

  return (
    <div>
      <h2 className='text-xl mb-4'>Last 4 weeks of weigh-ins</h2>
      <table className='w-full'>
        <tbody>
          {
            weights.map((w, index) => (
              <tr
                key={ w.created }
                className={ `${(weights.length - index) % 2 === 1 ? 'bg-gray-300' : ''} py-3` }
              >
                <td>
                <NavLink exact to={ routes.trackEditWeight.toPath(w.id) }>
                    <IconContext.Provider
                      value={{ className: 'text-green-700 p-3 w-12 h-12' }}
                    >
                      <BiPencil
                        className={ `cursor-pointer` }
                        title='Edit'
                        onClick={ () => { } }
                      />
                    </IconContext.Provider>
                  </NavLink>
                </td>
                <td className='py-2'>{ `${ round(w.value) }${ w.unit }s` }</td>
                <td>
                  <ResponsiveDate date={ w.created } />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default History