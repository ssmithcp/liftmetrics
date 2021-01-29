import { FaWeight, FaBed, FaRegStickyNote } from 'react-icons/fa'
import { GiChickenLeg, GiBiceps } from 'react-icons/gi'
import { IoBarbellSharp } from 'react-icons/io5'
import { CgPill } from 'react-icons/cg'
import { GrTrophy } from 'react-icons/gr'

import routes from '../navbar'

import TileBoard from '../container/TileBoard'

const tiles = [
  {
    Icon: () => <GrTrophy />,
    ...routes.trackGoal,
  },
  {
    Icon: () => <FaWeight />,
    ...routes.trackWeight,
  },
  {
    Icon: () => <GiChickenLeg />,
    ...routes.trackFood,
  },
  {
    Icon: () => <IoBarbellSharp />,
    ...routes.trackWorkout,
    comingSoon: true,
  },
  {
    Icon: () => <FaBed />,
    ...routes.trackSleep,
  },
  {
    Icon: () => <CgPill />,
    ...routes.trackSupplement,
    comingSoon: true,
  },
  {
    Icon: () => <GiBiceps />,
    ...routes.trackMeasurement,
    comingSoon: true,
  },
  {
    Icon: () => <FaRegStickyNote />,
    ...routes.trackNote,
  },
]

const Dashboard = () => (
  <TileBoard title='Select a metric to track' tiles={ tiles } />
)

export default Dashboard