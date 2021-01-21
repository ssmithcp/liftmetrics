import React from 'react'
import { NavLink as NL } from 'react-router-dom'

const NavLink = ({ title, route }) => (
  <NL
    exact
    to={ route }
    activeClassName='current'
    className='p-3 hover:text-primary'
  >
   <li className='inline-block'>
      { title }
    </li>
  </NL>
)

export default NavLink