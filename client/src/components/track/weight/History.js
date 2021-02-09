import { useSelector } from 'react-redux'

import { IconContext } from 'react-icons'
import { BiPencil } from 'react-icons/bi'

import { normalize } from '../../../util/weight'
import { day, dayTime } from '../../util/date'
import { round } from './Trends'

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
                className={ `${index % 2 === 1 ? 'bg-gray-300' : ''} py-3` }
              >
                <td>
                  <IconContext.Provider
                    value={{ className: 'text-green-700 p-3 w-12 h-12' }}
                  >
                    <BiPencil
                      className={ `cursor-pointer` }
                      title='Edit'
                      onClick={ () => { } }
                    />
                  </IconContext.Provider>
                </td>
                <td className='py-2'>{ `${ round(w.value) }${ w.unit }s` }</td>
                <td>
                  <p className='md:hidden'>{ day(w.created) }</p>
                  <p className='hidden md:block'>{ dayTime(w.created) }</p>
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