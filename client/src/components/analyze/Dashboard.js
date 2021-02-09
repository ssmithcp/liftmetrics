import routes from '../navigation'

import TileBoard from '../container/TileBoard'

const tiles = [
  {
    ...routes.analyzeWeekly,
    comingSoon: true,
  },
  {
    ...routes.analyzeGraph,
    comingSoon: true,
  },
]

const Dashboard = () => (
  <TileBoard title='Select an analysis model' tiles={ tiles } />
)

export default Dashboard