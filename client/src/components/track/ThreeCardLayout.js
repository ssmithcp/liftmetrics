import TitledPage from '../container/TitledPage'

const ThreeCardLayout = ({ title, TopLeft, TopRight, Bottom }) => (
  <TitledPage className='grid grid-cols-1 md:gap-6'>
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div className='py-4 md:py-12'>
        <TopLeft />
      </div>
      <div className='border-t md:border-t-0 md:border-l'>
        {/* assumes that left card has a larger height */}
        <div className='py-4 md:py-0 md:h-full'>
          <TopRight />
        </div>
      </div>
    </div>
    <Bottom />
  </TitledPage>
)

export default ThreeCardLayout