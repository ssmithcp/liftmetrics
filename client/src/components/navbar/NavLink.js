import React from 'react'
import { NavLink as NL } from 'react-router-dom'

const NavLink = ({ title, path }) => (
  <li key={ path } className='inline-block p-3 hover:text-primary'>
    <NL exact to={ path } activeClassName='current'>
      { title }
    </NL>
  </li>
)

export default NavLink