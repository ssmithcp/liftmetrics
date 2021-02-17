import { useState, useMemo, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import { getMovements, save, update } from '../../../actions/movement'

import MediumWidth from '../../container/MediumWidth'
import MovementSelect from './MovementSelect'
import ResponsiveSelect from '../ResponsiveSelect'
import Input from '../../form/Input'
import SaveButton from '../../util/SaveButton'

const P = ({ className = '', children }) => (
  <p className={ `${ className } mt-6 text-lg md:m-0 flex md:items-center md:justify-end` }>
    { children }
  </p>
)

const EditMovement = ({ getMovements, save, update }) => {
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
      id: 'new_movement',
      name: 'New movement*',
      type: movementTypes[0].id,
      modifiers: [],
      targetedMuscles: [],
    })

    return m
  },
  [movements, movementTypes])

  const [movement, setMovement] = useState('')
  const [name, setName] = useState('')
  const [movementType, setMovementType] = useState(movementTypes[0].id)
  const [modifiers, setModifiers] = useState('')
  const [targets, setTargets] = useState('')

  const reset = () => {
    setMovement('new_movement')
    setName('')
    setMovementType(movementTypes[0].id)
    setModifiers('')
    setTargets('')
  }

  const maybeSave = () => {
    const parse = list => {
      list = list.trim()
      if (list === '') {
        return []
      }
      return list.split(',').map(m => m.trim())
    }

    const newOrUpdated = {
      name,
      type: movementType,
      modifiers: parse(modifiers),
      targetedMuscles: parse(targets),
    }

    if (movement === 'new_movement') {
      return save(newOrUpdated)
        .then(reset)
    } else {
      newOrUpdated.id = movement
      return update(newOrUpdated)
        .then(reset)
    }
  }

  const movementChanged = id => {
    if (id === 'new_movement') {
      reset()
    } else {
      const selectedMovement = movements[id]
      setName(selectedMovement.name)
      setMovementType(selectedMovement.type)
      setModifiers(selectedMovement.modifiers.join(', '))
      setTargets(selectedMovement.targetedMuscles.join(', '))
      setMovement(id)
    }
  }

  return (
    <MediumWidth title='Add/edit movement' className='text-center'>
      <div className='grid grid-cols-1 gap-8'>
        <div className='mx-auto'>
          <MovementSelect
            movement={ movement }
            setMovement={ movementChanged }
            movements={ sortedMovements }
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-add-movement md:gap-6'>
          <P>Name</P>
          <Input
            placeholder='Squat'
            required
            minLength='1'
            maxLength='100'
            value={ name }
            onChange={ e => setName(e.target.value) }
          />
          <P className='mb-3 md:mb-0'>Movement type</P>
          <ResponsiveSelect
            name='movementType'
            value={ movementType }
            setValue={ setMovementType }
            values={ movementTypes }
          />
          <P>Modifiers</P>
          <Input
            placeholder='low bar, pause'
            value={ modifiers }
            onChange={ e => setModifiers(e.target.value) }
          />
          <P>Targeted muscles</P>
          <Input
            placeholder='quad, hamstring, glutes, back'
            value={ targets }
            onChange={ e => setTargets(e.target.value) }
          />
        </div>
        <div>
          <SaveButton
            doSave={ maybeSave }
            tabIndex='0'
            disabled={ movement === '' }
          />
        </div>
      </div>
    </MediumWidth>
  )
}

export default connect(null, { getMovements, save, update })(EditMovement)