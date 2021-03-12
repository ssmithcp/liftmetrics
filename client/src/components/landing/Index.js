import config from './../../util/config'

import FullScreen from './FullScreen'

import barbell from '../images/barbell.png'

const Index = () => (
  <FullScreen>
    <div className='relative' title={ config.versionTitle }>
      <h1 className='text-6xl'>LiftMetrics</h1>
      <p className='font-semibold absolute right-0 top-0 transform translate-x-full'>&alpha;</p>
    </div>
    <img src={ barbell } alt='barbell' className='w-550px my-7' />
    <ul className='flex text-4xl mb-2'>
      <li className='mx-6'>Lift</li>
      <li className='mx-6'>Track</li>
      <li className='mx-6'>PR</li>
    </ul>
  </FullScreen>
)

export default Index
