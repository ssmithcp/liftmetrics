import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import routes from '../../navigation'
import { normalize } from '../../../util/weight'
import { round } from './Trends'
import ResponsiveDate from '../ResponsiveDate'
import EditPencil from '../EditPencil'
import StripedRow from '../StripedRow'

const History = () => {
  const unit = useSelector(s => s.profile.weightUnit)
  const weights = useSelector(s => s.weight)

  const reversed = useMemo(() =>
    weights
      .map(w => normalize(w, unit))
      .sort((a, b) => b.created.getTime() - a.created.getTime()),
    [weights, unit]
  )

  return (
    <div>
      <h2 className='text-xl mb-4'>Recent weigh-ins</h2>
      <div>
        { reversed.map((w, index) => (
            <StripedRow index={ weights.length - index }>
              <NavLink
                exact
                to={ routes.trackEditWeight.toPath(w.id) }
                key={ w.created }
                className={ `p-2 flex items-center` }
              >
                <div className='w-52 mx-4 md:mx-8 flex items-center'>
                  <EditPencil />
                  <p className='pl-4'>{ `${ round(w.value) }${ w.unit }s` }</p>
                </div>
                <ResponsiveDate date={ w.created } />
              </NavLink>
            </StripedRow>
        ))}
      </div>
    </div>
  )
}

export default History