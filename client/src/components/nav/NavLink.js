import React from 'react'
import { NavLink as NL } from 'react-router-dom'

const NavLink = ({ title, path }) => (
  <NL
    exact
    to={ path }
    activeClassName='current'
    className='p-3 hover:text-primary'
  >
   <li className='inline-block'>
      { title }
    </li>
  </NL>
)

export default NavLink