import React from 'react'
import { NavLink as NL } from 'react-router-dom'

const NavLink = ({ title, route }) => (
  <NL to={ route } exact activeClassName='current' className='p-3'>
   <li className='inline-block'>
      { title }
    </li>
  </NL>
)

export default NavLink