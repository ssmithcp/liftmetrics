import ThreeCardLayout from '../ThreeCardLayout'

import AddExercise from './AddExercise'
import Trends from './Trends'
import History from './History'

const Workout = () => (
  <ThreeCardLayout
    title='Workouts'
    TopLeft={ AddExercise }
    TopRight={ Trends }
    Bottom={ History }
  />
)

export default Workout