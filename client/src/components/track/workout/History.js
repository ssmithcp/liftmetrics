import { useSelector } from 'react-redux'
import { startOfDay, isToday } from 'date-fns'

import { normalize } from '../../../util/weight'

import { day, dayTime } from '../../util/date'

const History = () => {
  const movements = useSelector(s => s.movement)
  const unit = useSelector(s => s.profile.weightUnit)

  const exercises = useSelector(s => s.exercise)
    .map(w => normalize(w, unit))
    .sort((a, b) => b.created.getTime() - a.created.getTime())

  console.log(exercises)

  return (
    <div>
      <h2 className='text-xl mb-4'>Recent workouts</h2>
      <table className='w-full'>
        <tbody>
          {
            exercises.map((e, index) => (
              <tr
                key={ e.created }
                className={ `${index % 2 === 1 ? 'bg-gray-300' : ''} py-3` }
              >
                <td>{ (movements[e.movement] && movements[e.movement].name)  || 'unknown' }</td>
                <td>
                  <p>{ `${ e.sets } x ${ e.reps } x ${ e.value }${ e.unit }s = ${ e.sets * e.reps * e.value }${ e.unit }s` }</p>
                </td>
                <td>
                  <p className='md:hidden'>{ day(e.created) }</p>
                  <p className='hidden md:block'>{ dayTime(e.created) }</p>
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