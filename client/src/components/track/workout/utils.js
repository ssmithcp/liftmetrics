import { startOfDay } from 'date-fns'

import { normalize } from '../../../util/weight'

export const exercisesByDay = (exercises, unit) => (
  Object.values(
    exercises
    .map(w => normalize(w, unit))
    .reduce((a, v) => {
      const day = startOfDay(v.created)

      a[day] = a[day] || { day, data: [] }
      a[day].data.push(v)

      return a
    }, {}))
  .sort((a, b) => b.day.getTime() - a.day.getTime())
  .map(d => ({
    day: d.day,
    data: d.data.sort((a, b) => a.created.getTime() - b.created.getTime()),
  }))
)