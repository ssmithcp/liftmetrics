import { NavLink } from 'react-router-dom'

import { IconContext } from 'react-icons'

import TitledPage from './TitledPage'

const Tile = ({ Icon, iconStyle, title, path }) => (
  <NavLink
    to={ path }
    className='p-8 w-56 h-56 flex flex-col items-center justify-between hover:bg-gray-200'
    title={ `Track ${ title.toLowerCase() }` }
  >
    <div className='flex-1 flex items-center'>
      <IconContext.Provider value={{ className:`w-24 h-24 text-gray-900 ${ iconStyle || '' }` }}>
        <Icon />
      </IconContext.Provider>
    </div>
    <p className='text-xl text-center'>{ title }</p>
  </NavLink>
)

const TileBoard = ({ title, tiles }) => {
  return (
    <TitledPage title={ title } className='flex flex-wrap'>
      { tiles.map(tile =>
        <Tile key={ tile.path } { ...tile } />
      )}
    </TitledPage>
  )
}

export default TileBoard