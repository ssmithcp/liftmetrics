import routes from './index'

import { FaWeight, FaBed, FaRegStickyNote } from 'react-icons/fa'
import { GiChickenLeg, GiBiceps } from 'react-icons/gi'
import { IoBarbellSharp } from 'react-icons/io5'
import { CgPill } from 'react-icons/cg'
import { AiOutlineTrophy, AiOutlineQuestionCircle, AiOutlineHome } from 'react-icons/ai'
import { RiPencilRuler2Line } from 'react-icons/ri'
import { BsGraphUp } from 'react-icons/bs'
import { IoCalendarOutline } from 'react-icons/io5'

const Icon = ({ name }) => {
  // convenience if a route is passed in
  if (name.title) {
    name = name.title
  }
  name = name.toLowerCase()

  switch (name) {
    case routes.home.title.toLowerCase():
      return <AiOutlineHome />
    case routes.trackHome.title.toLowerCase():
      return <RiPencilRuler2Line />
    case routes.trackWeight.title.toLowerCase():
      return <FaWeight />
    case routes.trackFood.title.toLowerCase():
      return <GiChickenLeg />
    case routes.trackWorkout.title.toLowerCase():
      return <IoBarbellSharp />
    case routes.trackSleep.title.toLowerCase():
      return <FaBed />
    case routes.trackSupplement.title.toLowerCase():
      return <CgPill />
    case routes.trackMeasurement.title.toLowerCase():
      return <GiBiceps />
    case routes.trackNote.title.toLowerCase():
      return <FaRegStickyNote />
    case routes.trackGoal.title.toLowerCase():
      return <AiOutlineTrophy />
    case routes.analyzeGraph.title.toLowerCase():
    case routes.analyzeHome.title.toLowerCase():
      return <BsGraphUp />
    case routes.analyzeWeekly.title.toLowerCase():
      return <IoCalendarOutline />
    default:
      return <AiOutlineQuestionCircle />
  }
}

export default Icon
