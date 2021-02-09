import routes from '../navigation'

import TileBoard from '../container/TileBoard'

const tiles = [
  {
    ...routes.trackFood,
    comingSoon: true,
  },
  {
    ...routes.trackSleep,
    comingSoon: true,
  },
  routes.trackWeight,
  {
    ...routes.trackWorkout,
    comingSoon: true,
  },
  {
    ...routes.trackSupplement,
    comingSoon: true,
  },
  {
    ...routes.trackMeasurement,
    comingSoon: true,
  },
  {
    ...routes.trackGoal,
    comingSoon: true,
  },
  {
    ...routes.trackNote,
    comingSoon: true,
  },
]

const Dashboard = () => (
  <TileBoard title='Select a metric to track' tiles={ tiles } />
)

export default Dashboard