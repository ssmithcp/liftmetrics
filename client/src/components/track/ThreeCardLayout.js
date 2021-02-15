import TitledPage from '../container/TitledPage'

const Card = ({ children, className = ''}) => (
  <div className={ `flex flex-col justify-center items-center ${ className }` }>
    <div>
      { children }
    </div>
  </div>
)

const ThreeCardLayout = ({ title, TopLeft, TopRight, Bottom }) => (
  <TitledPage title={ title } className='grid grid-cols-1 gap-6'>
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <Card className='pt-4 pb-10 md:py-12'>
        <TopLeft />
      </Card>
      <div className='border-t md:border-t-0 md:border-l'>
        {/* assumes that left card has a larger height */}
        <Card className='py-10 md:py-0 md:h-full'>
          <TopRight />
        </Card>
      </div>
    </div>
    <Bottom />
  </TitledPage>
)

export default ThreeCardLayout