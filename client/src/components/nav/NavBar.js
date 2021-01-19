import React from 'react'

import Container from '../util/Container'
import Logo from './Logo'
import Navigation from './Navigation'

const NavBar = () => (
  <div className='border-b border-gray-300 mb-3'>
    <Container className='flex justify-between items-center my-3'>
      <Logo />
      <Navigation />
    </Container>
  </div>
)

export default NavBar