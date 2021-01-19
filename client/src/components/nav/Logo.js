import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => (
  <NavLink to='/' className='flex items-center'>
    <img src='images/barbell.svg' alt='barbell' className='w-10 mr-2'/>
    <h3 className='text-lg'>liftmetrics.net</h3>
  </NavLink>
)

export default Logo