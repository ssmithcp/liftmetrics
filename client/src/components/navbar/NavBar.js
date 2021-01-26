import React from 'react'

import Container from '../util/Container'
import Logo from './Logo'
import NavLinks from './NavLinks'

const NavBar = () => (
  <div className='flex fixed z-10 w-full top-0 border-b border-soft-black bg-white'>
    <Container className='flex flex-col items-center justify-between mt-2 md:flex-row md:my-3'>
      <Logo />
      <NavLinks />
    </Container>
  </div>
)

export default NavBar