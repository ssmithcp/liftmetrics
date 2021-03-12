import config from '../../util/config'
import SafeExternalLink from '../navigation/SafeExternalLink'
import InternalLink from '../navigation/InternalLink'

import routes from '../navigation'

import scottSquat from '../images/scott_squat_low.jpg'

const P = ({ children }) => (
  <p className='mb-3'>
    { children }
  </p>
)

const About = () => (
  <section className='text-lg flex flex-col select-text md:block'>
    <h1 className='text-3xl text-center pb-4'>Welcome to LiftMetrics!</h1>
    <div className='flex flex-col items-center md:flex-row'>
      <img
        src={ scottSquat }
        alt='scott squatting'
        className='h-56 w-56 mb-2 md:mr-7 md:float-left'
      />
      <div>
        <P><span className="text-2xl mr-2">👋</span>My name is Scott and LiftMetrics is a portfolio project that I built and maintain.</P>
        <P>To contact me about a job opportunity, reach out on <SafeExternalLink to={ config.get('linkedinURL') }>LinkedIn</SafeExternalLink> or shoot me an email at <span className='font-mono text-base'>ssmith.cp <strong>at</strong> gmail.com</span>.</P>
        <P>Check out <SafeExternalLink to={ config.get('lmGithubURL') }>LiftMetrics source</SafeExternalLink> or jump to a <SafeExternalLink to={ config.get('portfolioURL') }>CSS showcase</SafeExternalLink> project whose source is <SafeExternalLink to={ config.get('portfolioGithubURL') }>here.</SafeExternalLink> I have a few other projects on <SafeExternalLink to={ config.get('githubURL') }>GitHub</SafeExternalLink> - more to come!</P>
        <P>LiftMetrics is an 'Alpha' release. There is so much functionality I'd like to add, in addition to nailing down the UI/UX but I have a lot more I want to learn about the full stack space. For the few of you actually using the site, let me know if there is a feature you're dying to see - maybe I can crank it out for you!</P>
      </div>
    </div>
    <h2 className='text-xl my-4 font-bold'>About the site</h2>
    <P>I’ve been thinking about LiftMetrics for some time. The original idea came from a lifting buddy Brian (Hi Brian!) and I’ve been percolating on the idea for years. I took time off to study Full Stack Web Development and LiftMetrics is the result.</P>
    <P>The goal of LiftMetrics is to be a platform where any metric related to lifting weights (workout reps sets and intensity, body dimensions, body weight, food, sleep, supplementation, cardio, etc...) can be tracked. Once tracked, you can analyze the data (with graphs, charts and tables) to determine what metrics contribute to your desired outcome.</P>
    <P>For example: you can determine which bicep exercise most effectively grows your guns 💪 and how staying up late to play ‘Escape From Tarkov’ influences your one rep max squat weight.</P>
    <P><InternalLink to={ routes.signUp.path }>Create an account</InternalLink> and start kicking ass!</P>
  </section>
)

export default About
