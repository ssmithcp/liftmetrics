import React from 'react'

import config from '../util/config'
import SafeExternalLink from './util/SafeExternalLink'
import InternalLink from './util/InternalLink'

import routes from './nav'

const P = ({ children }) => (
  <p className='mb-3'>
    { children }
  </p>
)

const About = () => (
  <section className='text-lg flex flex-col md:block'>
    <h1 className='text-3xl text-center pb-4'>Welcome to LiftMetrics!</h1>
    <div className='flex flex-col items-center md:flex-row'>
      <img
        src='images/scott_head_shot.jpg'
        alt='scott head shot'
        className='h-56 w-56 mr-7 mb-2 lg:float-left'
      />
      <div>
        <P><span className="text-2xl mr-2">👋</span>My name is Scott and LiftMetrics is a portfolio project that I built and maintain.</P>
        <P>To contact me about a job opportunity, reach out on <SafeExternalLink to={ config.get('linkedinURL') }>LinkedIn</SafeExternalLink> or shoot me an email at <span className='font-mono text-base'>ssmith <strong>dot</strong> cp <strong>at</strong> gmail <strong>dot</strong> com</span>. Check out some of my other projects on <SafeExternalLink to={ config.get('githubURL') }>GitHub</SafeExternalLink>.</P>
        <P>The source code for LiftMetrics isn’t publicly available on the off chance I monetize the site; if you’re a potential client or employer and would like to see the code, just ask!</P>
      </div>
    </div>
    <h2 className='text-xl my-4 font-bold'>About the site</h2>
    <P>I’ve been thinking about LiftMetrics for some time. The original idea came from a lifting buddy Brian (Hi Brian!) and I’ve been percolating on the idea for years. I took time off to study Full Stack Web Development and LiftMetrics is the result.</P>
    <P>The goal of LiftMetrics is to be a platform where any metric related to lifting weights (workout reps sets and intensity, body dimensions, body weight, food, sleep, suppliemention, cardio, etc...) can be tracked. Once tracked, you can analyze the data (with graphs, charts and tables) to determine what metrics contribute to your desired outcome.</P>
    <P>For example: you can determine which bicep exercise most effectively grows your guns 💪 and how staying up late to play ‘Escape From Tarkov’ influences your one rep max squat weight.</P>
    <P><InternalLink to={ routes.signUp.path }>Create an account</InternalLink> and start kicking ass!</P>
  </section>
)

export default About