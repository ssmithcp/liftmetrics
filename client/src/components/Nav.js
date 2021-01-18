import React from 'react'

import Container from './util/Container'

const Nav = () => (
  <div className='border-b border-gray-300'>
    <Container className='flex justify-between items-center my-3'>
      <h3>liftmetrics.net</h3>
      <ul>
        <li>Login</li>
        <li>Sign Up</li>
      </ul>
    </Container>
  </div>
)

export default Nav