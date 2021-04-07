import { useEffect } from 'react'
import { connect } from 'react-redux'

import { getMovements } from '../../../actions/movement'
import { getExercises } from '../../../actions/exercise'

import ThreeCardLayout from '../ThreeCardLayout'

import AddExercise from './AddExercise'
import ExerciseTabbedPanel from './ExerciseTabbedPanel'
import History from './History'

const Workout = ({ getMovements, getExercises }) => {
  useEffect(getMovements, [getMovements])
  useEffect(getExercises, [getExercises])

  return <ThreeCardLayout
      title='Workouts'
      TopLeft={ AddExercise }
      TopRight={ ExerciseTabbedPanel }
      Bottom={ History }
    />
}

export default connect(null, { getMovements, getExercises })(Workout)