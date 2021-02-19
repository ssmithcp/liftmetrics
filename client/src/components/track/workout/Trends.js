import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { startOfWeek, isAfter } from 'date-fns'

const Trends = () => {
  const movements = useSelector(s => s.movement)
  const exercises = useSelector(s => s.exercise)
  const weekStartDay = useSelector(s => s.profile.weekStartDay)

  let setsPerMuscle = useMemo(() => {
    if (Object.keys(movements).length === 0) {
      return []
    }

    const start = startOfWeek(Date.now(), { weekStartsOn: weekStartDay })

    const exercisesThisWeek = exercises.filter(e => isAfter(e.created, start))
    const musclesToSetCount = exercisesThisWeek
      .map(e => movements[e.movement])
      .flatMap(m => m.targetedMuscles)
      .reduce((prev, current) => {
        prev[current] = 0
        return prev
      }, {})

      exercisesThisWeek.forEach(e => {
        movements[e.movement].targetedMuscles.forEach(t => {
          musclesToSetCount[t] += e.sets
        })
      })

      return Object.keys(musclesToSetCount)
        .map(m => ({
          muscle: m,
          sets: musclesToSetCount[m]
        }))
        .sort((a, b) => b.sets - a.sets)
  }, [exercises, movements, weekStartDay])

  if (setsPerMuscle.length > 5) {
    setsPerMuscle = setsPerMuscle.slice(0, 5)
  }

  return (
    <div className='text-lg flex flex-col items-center'>
      <h1 className='mb-2'>Most sets per muscle this week</h1>
      <div>
        { setsPerMuscle.map(e =>
          <p
            key={ e.muscle }
            className='my-2'
          >
            { e.sets + ' sets for ' + e.muscle}
          </p>
        )}
      </div>
    </div>
  )
}

export default Trends