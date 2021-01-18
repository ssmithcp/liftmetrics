import React from 'react'
import SafeExternalLink from './util/SafeExternalLink'

const GITHUB_URL = 'https://github.com/ssmithcp/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/scottcsmithdev/'

const Home = () => (
  <div className='text-lg'>
    <h1 className='text-center py-4'>Welcome to LiftMetrics!</h1>
    <div className='flex mb-4'>
      <img className='h-72 w-72 mr-6 rounded-xl' src='img/scott_squat_low.jpg' alt='scott squats' />
      <div className='flex flex-col justify-evenly'>
        <p className='text-2xl'>👋</p>
        <p>My name is Scott Smith and LiftMetrics is a portfolio project that I built and maintain.</p>
        <p>The source code for LiftMetrics isn’t publicly available on the off chance I monetize the site; if you’re a potential client or employer and would like to see the code, just ask!</p>
        <p>To contact me about a job opportunity, reach out on <SafeExternalLink target={ LINKEDIN_URL }>LinkedIn</SafeExternalLink> or shoot me an email at <span className='font-mono text-base'>ssmith <strong>dot</strong> cp <strong>at</strong> gmail <strong>dot</strong> com</span>. Check out some of my other projects on <SafeExternalLink target={ GITHUB_URL }>GitHub</SafeExternalLink>.</p>
      </div>
    </div>
    <p className='mb-4'>I’ve been thinking about LiftMetrics for some time. The original idea came from a lifting buddy Brian (Hi Brian!) and I’ve been percolating on the idea for years. I took time off to study full stack web development and LiftMetrics is the result.</p>
    <p className='mb-4'>The goal of LiftMetrics is to be a platform where any metric related to lifting weights (workout reps sets and intensity, body dimensions, body weight, food, sleep, suppliemention, cardio etc..) can be tracked. Once tracked, you can analyze the data (with graphs, charts and tables) to determine what metrics contribute to your desired outcome.</p>
    <p className='mb-4'>For example: you can determine which bicep exercise most effectively grows your guns 💪 and how staying up late to play ‘Escape From Tarkov’ influences your one rep max squat weight.</p>
    <p className='mb-4'>Create an account and start kicking ass!</p>
    <h1>Link to signup here!</h1>
  </div>
)

export default Home
