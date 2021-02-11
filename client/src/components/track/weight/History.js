import { useMemo } from 'react'
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

  const reversed = useMemo(() =>
    weights
      .map(w => normalize(w, unit))
      .sort((a, b) => b.created.getTime() - a.created.getTime()),
    [weights, unit])

  return (
    <div>
      <h2 className='text-xl mb-4'>Recent weigh-ins</h2>
      <div>
        { reversed.map((w, index) => {
          const rowStyle = (weights.length - index) % 2 === 1
            ? 'bg-gray-200 hover:bg-gray-400 hover:opacity-90'
            : 'hover:bg-gray-400 hover:opacity-90'

          return (
            <NavLink
              exact
              to={ routes.trackEditWeight.toPath(w.id) }
              key={ w.created }
              className={ `p-2 flex items-center ${ rowStyle } ` }
            >
              <div className='w-52 mx-4 md:mx-8 flex items-center'>
                <IconContext.Provider value={{ className: 'text-green-700 py-3 w-12 h-12' }}>
                  <BiPencil
                    className={ `cursor-pointer` }
                    title='Edit'
                    onClick={ () => { } }
                  />
                </IconContext.Provider>
                <p className='pl-4'>{ `${ round(w.value) }${ w.unit }s` }</p>
              </div>
              <ResponsiveDate date={ w.created } />
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default History