import React from 'react'
import { NavLink } from 'react-router-dom'

import routes from './index'

const Logo = ({ className }) => (
  <NavLink to={ routes.home.path }className={ `flex items-center ${className}` }>
    <img src='images/dumbell.svg' alt='barbell' className='w-10 mr-2'/>
    <h3 className='text-lg'>LiftMetrics</h3>
  </NavLink>
)

export default Logo