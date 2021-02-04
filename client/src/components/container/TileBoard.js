import { NavLink } from 'react-router-dom'

import { IconContext } from 'react-icons'

import Icon from '../navigation/Icon'
import TitledPage from './TitledPage'

const Tile = ({ iconStyle, title, comingSoon }) => (
  <div
    className='p-8 w-56 h-56 flex flex-col items-center justify-between hover:bg-gray-200'
    title={ `Track ${ title.toLowerCase() }` }
  >
    { comingSoon && (
      <h1 className='absolute z-10 text-2xl font-semibold transform rotate-45 translate-y-12'>Coming Soon!</h1>
    )}
    <div className='relative flex-1 flex items-center'>
      <IconContext.Provider value={{
          className:`w-24 h-24 ${ comingSoon ? 'text-gray-400' : 'text-primary' } ${ iconStyle || '' }`
        }}>
        <Icon name={ title }/>
      </IconContext.Provider>
    </div>
    <p className='text-xl text-center'>{ title }</p>
  </div>
)

const TileBoard = ({ title, tiles }) => {
  return (
    <TitledPage title={ title } className='flex flex-wrap'>
      { tiles.map(tile => {
          tile.comingSoon = tile.comingSoon || false

          return tile.comingSoon
            ? <Tile key={ tile.path } { ...tile } />
            : (
              <NavLink key={ tile.path } to={ tile.path }>
                <Tile { ...tile } />
              </NavLink>
            )
      })}
    </TitledPage>
  )
}

export default TileBoard