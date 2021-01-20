import React from 'react'

import Container from '../util/Container'
import Logo from './Logo'
import Navigation from './Navigation'

// display: flex;
// justify-content: space-between;
// align-items: center;
// padding: 0.7rem 2rem;
// position: fixed;
// z-index: 1;
// width: 100%;
// top: 0;

const NavBar = () => (
  <div className='flex fixed z-10 w-full top-0 border-b border-gray-500 bg-white'>
    <Container className='flex flex-col items-center my-3 justify-between md:flex-row'>
      <Logo className='mb-2 md:mb-0'/>
      <Navigation />
    </Container>
  </div>
)

export default NavBar