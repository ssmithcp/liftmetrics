import { useMemo } from 'react'

import ResponsiveSelect from '../ResponsiveSelect'

export const formatName = movement => {
  const copy = { ...movement }
  copy.name = copy.name.toLowerCase()

  if (copy.name.startsWith('ez')) {
    copy.name = 'EZ' + copy.name.substring(2)
  } else if (copy.name.startsWith('db')) {
    copy.name = 'DB' + copy.name.substring(2)
  } else if (copy.name.startsWith('tng')) {
    copy.name = 'TNG' + copy.name.substring(3)
  } else {
    copy.name = copy.name[0].toUpperCase() + copy.name.substring(1)
  }

  if (copy.modifiers.length > 0) {
    copy.name += ' w/ ' + copy.modifiers.join(', ')
  }

  return copy
}

const MovementSelect = ({ movement, setMovement, movements }) => {
  const formattedMovements = useMemo(() => movements.map(formatName), [movements])

  return (
    <ResponsiveSelect
      name='movement'
      value={ movement }
      setValue={ setMovement }
      values={ formattedMovements }
    />
  )
}

export default MovementSelect