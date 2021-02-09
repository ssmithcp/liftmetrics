import Alerts from '../util/Alerts'

import PageWidthContainer from '../container/PageWidthContainer'
import Logo from './Logo'
import NavLinks from './NavLinks'

const NavBar = () => (
  <div className='fixed z-30 w-full top-0'>
    <div className='flex border-b border-soft-black bg-white'>
      <PageWidthContainer className='flex flex-col items-center justify-between mt-2 md:flex-row md:mt-0'>
        <Logo />
        <NavLinks />
      </PageWidthContainer>
    </div>
    <Alerts />
  </div>
)

export default NavBar