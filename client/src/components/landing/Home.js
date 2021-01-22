import React from 'react'

import InternalLink from '../util/InternalLink'
import routes from '../nav'

import barbell from '../images/barbell.png'

const Home = () => (
  <>
    <section className='h-screen flex flex-col justify-center items-center'>
      <h1 className='text-6xl'>LiftMetrics</h1>
      <img src={ barbell } alt='barbell' className='w-550px my-7' />
      <ul className='flex text-4xl mb-2'>
        <li className='m-6'>Lift</li>
        <li className='m-6'>Track</li>
        <li className='m-6'>PR</li>
      </ul>
    </section>
    <footer className='fixed right-0 bottom-0 left-0 z-10 text-center'>
      <p className='m-2 text-gray-700'>
        &#169; { new Date().getFullYear() } <InternalLink to={ routes.about.path }>Scott Smith</InternalLink>
      </p>
    </footer>
  </>
)

export default Home
