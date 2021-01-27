import { NavLink } from 'react-router-dom'

import routes from './index'

import dumbell from '../images/dumbell.svg'

const Logo = ({ className }) => (
  <NavLink to={ routes.index.path } className={ `flex items-center ${className || ''}` }>
    <img src={ dumbell } alt='dumbell' className='w-10 mr-2'/>
    <h3 className='text-lg'>LiftMetrics</h3>
  </NavLink>
)

export default Logo