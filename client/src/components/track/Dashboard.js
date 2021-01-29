import { FaWeight, FaBed, FaRegStickyNote } from 'react-icons/fa'
import { GiChickenLeg, GiBiceps } from 'react-icons/gi'
import { IoBarbellSharp } from 'react-icons/io5'
import { CgPill } from 'react-icons/cg'
import { AiOutlineTrophy } from 'react-icons/ai'

import routes from '../navigation'

import TileBoard from '../container/TileBoard'

const tiles = [
  {
    Icon: () => <AiOutlineTrophy />,
    ...routes.trackGoal,
    comingSoon: true,
  },
  {
    Icon: () => <FaWeight />,
    ...routes.trackWeight,
    comingSoon: true,
  },
  {
    Icon: () => <GiChickenLeg />,
    ...routes.trackFood,
    comingSoon: true,
  },
  {
    Icon: () => <IoBarbellSharp />,
    ...routes.trackWorkout,
    comingSoon: true,
  },
  {
    Icon: () => <FaBed />,
    ...routes.trackSleep,
    comingSoon: true,
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
    comingSoon: true,
  },
]

const Dashboard = () => (
  <TileBoard title='Select a metric to track' tiles={ tiles } />
)

export default Dashboard