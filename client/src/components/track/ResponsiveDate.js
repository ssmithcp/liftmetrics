import { day, dayTime } from '../../util/date'

const ResponsiveDate = ({ date }) => (
  <>
    <p className='md:hidden'>{ day(date) }</p>
    <p className='hidden md:block'>{ dayTime(date) }</p>
  </>
)

export default ResponsiveDate