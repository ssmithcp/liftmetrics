import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => (
  <section>
    <h1>LiftMetrics</h1>
    <img src='images/barbell.svg' alt='barbell' className='w-32'/>
    <h2>Lift. Track. Analyze. PR.</h2>
    <NavLink to='/signup'>Sign Up</NavLink>
    <NavLink to='/login'>Login</NavLink>
  </section>
)

export default Home
