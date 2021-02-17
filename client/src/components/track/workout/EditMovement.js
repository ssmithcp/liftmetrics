import { useState, useMemo, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import { getMovements } from '../../../actions/movement'

import MediumWidth from '../../container/MediumWidth'
import ResponsiveSelect from '../ResponsiveSelect'
import Input from '../../form/Input'
import SaveButton from '../../util/SaveButton'

const P = ({ children }) => <p className='mt-6 md:m-0 flex md:items-center md:justify-end'>{ children }</p>

const EditMovement = ({ getMovements }) => {
  useEffect(getMovements, [getMovements])

  const movementTypes = useSelector(s => s.profile.availableMovementTypes)
    .map(t => ({
        id: t,
        name: t[0].toUpperCase() + t.substring(1),
      }))
  const movements = useSelector(s => s.movement)

  const sortedMovements = useMemo(() => {
    const m = Object.keys(movements)
      .map(k => movements[k])
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    m.unshift({
      id: '-1',
      name: 'New movement*',
      type: movementTypes[0].id,
      modifiers: [],
      targetedMuscles: [],
    })

    return m
  },
  [movements, movementTypes])

  const [movement, setMovement] = useState('')
  const [movementType, setMovementType] = useState('')

  return (
    <MediumWidth title='Add/edit movement' className='text-center'>
      <div className='grid grid-cols-1 gap-8'>
        <div className='mx-auto'>
          <ResponsiveSelect
            name='movement'
            value={ movement }
            setValue={ setMovement }
            values={ sortedMovements }
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-add-movement md:gap-6'>
          <P>Name</P>
          <Input
            placeholder='Squat'
          />
          <P>Movement type</P>
          <ResponsiveSelect
            name='movementType'
            value={ movementType }
            setValue={ setMovementType }
            values={ movementTypes }
          />
          <P>Modifiers</P>
          <Input
            placeholder='low bar, paused'
          />
          <P>Targeted muscles</P>
          <Input
            placeholder='quad, hamstring, glutes, back'
          />
        </div>
        <div>
          <SaveButton
            doSave={ () => { } }
            tabIndex='0'
            disabled={ movement === '' }
          />
        </div>
      </div>
    </MediumWidth>
  )
}

export default connect(null, { getMovements })(EditMovement)