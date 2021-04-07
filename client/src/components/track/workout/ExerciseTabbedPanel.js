import TabbedPanel from '../../container/TabbedPanel'
import SetsPerMuscle from './SetsPerMuscle'
import LastWeeksWorkout from './LastWeeksWorkout'

const ExerciseTabbedPanel = () => (
  <TabbedPanel
    active='Last week'
    tabs={[
      {
        name: 'Last week',
        component: LastWeeksWorkout,
      },
      {
        name: 'Sets per muscle',
        component: SetsPerMuscle,
      },
    ]}
  />
)

export default ExerciseTabbedPanel