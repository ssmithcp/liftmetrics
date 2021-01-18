import React from 'react'
import SafeExternalLink from './util/SafeExternalLink'

const GITHUB_URL = 'https://github.com/ssmithcp/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/scottcsmithdev/'

const P = ({ children }) => (
  <p className='mb-3'>
    { children }
  </p>
)

const Home = () => (
  <div className='text-lg flex flex-col md:block'>
    <h1 className='text-3xl text-center py-4'>Welcome to LiftMetrics!</h1>
    <img
      className='h-72 w-72 mx-auto rounded-xl md:float-left md:-m-0 md:mr-7 md:mb-2'
      src='images/scott_squat_low.jpg'
      alt='scott squats'
    />
    <P className='text-2xl'></P>
    <P><span className="text-2xl mr-2">👋</span>My name is Scott Smith and LiftMetrics is a portfolio project that I built and maintain.</P>
    <P>The source code for LiftMetrics isn’t publicly available on the off chance I monetize the site; if you’re a potential client or employer and would like to see the code, just ask!</P>
    <P>To contact me about a job opportunity, reach out on <SafeExternalLink target={ LINKEDIN_URL }>LinkedIn</SafeExternalLink> or shoot me an email at <span className='font-mono text-base'>ssmith <strong>dot</strong> cp <strong>at</strong> gmail <strong>dot</strong> com</span>. Check out some of my other projects on <SafeExternalLink target={ GITHUB_URL }>GitHub</SafeExternalLink>.</P>
    <P>I’ve been thinking about LiftMetrics for some time. The original idea came from a lifting buddy Brian (Hi Brian!) and I’ve been percolating on the idea for years. I took time off to study Full Stack Web Development and LiftMetrics is the result.</P>
    <P>The goal of LiftMetrics is to be a platform where any metric related to lifting weights (workout reps sets and intensity, body dimensions, body weight, food, sleep, suppliemention, cardio etc..) can be tracked. Once tracked, you can analyze the data (with graphs, charts and tables) to determine what metrics contribute to your desired outcome.</P>
    <P>For example: you can determine which bicep exercise most effectively grows your guns 💪 and how staying up late to play ‘Escape From Tarkov’ influences your one rep max squat weight.</P>
    <P>Create an account and start kicking ass!</P>
    <h1>Link to signup here!</h1>
  </div>
)

export default Home
