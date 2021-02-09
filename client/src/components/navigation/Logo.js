import { NavLink } from 'react-router-dom'

import config from '../../util/config'
import routes from './index'

import dumbell from '../images/dumbell.svg'

const Logo = ({ className }) => (
  <NavLink to={ routes.index.path } className={ `flex items-center ${className || ''}` }>
    <img src={ dumbell } alt='dumbell' className='w-10 mr-3 mt-1 md:w-10 md:mr-2 md:mt-0'/>
    <div
      className='relative hidden md:block'
      title={ config.versionTitle }
    >
      <h3 className='text-lg'>LiftMetrics</h3>
      <p className='text-xs uppercase absolute right-0 top-0 transform translate-x-full -translate-y-1'>Alpha</p>
    </div>
  </NavLink>
)

export default Logo