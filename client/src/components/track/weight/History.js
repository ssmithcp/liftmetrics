import { useSelector } from 'react-redux'

import { normalize } from '../../../util/weight'
import { dayTime } from '../../util/date'
import { round } from './Trends'

const History = () => {
  const unit = useSelector(s => s.profile.weightUnit)
  const weights = useSelector(s => s.weight).map(w => normalize(w, unit)).sort((a, b) => b.created.getTime() - a.created.getTime())

  return (
    <div>
      <h2 className='text-xl mb-4'>Last 6 weeks of weigh-ins</h2>
      <table>
        <tbody>
          {
            weights.map(w => (
              <tr key={ w.created }>
                <td>{ `${ round(w.value) }${ w.unit }s`}</td>
                <td>{ dayTime(w.created) }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default History