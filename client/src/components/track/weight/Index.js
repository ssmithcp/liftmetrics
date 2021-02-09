import ThreeCardLayout from '../ThreeCardLayout'

import Record from './Record'
import Trends from './Trends'
import History from './History'

const Weight = () => (
  <ThreeCardLayout
    title='Body weight'
    TopLeft={ Record }
    TopRight={ Trends }
    Bottom={ History }
  />
)

export default Weight