import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import routes from '../../navigation'
import { normalize } from '../../../util/length'

import ResponsiveDate from '../ResponsiveDate'
import EditPencil from '../EditPencil'
import StripedRow from '../StripedRow'

const History = () => {
  const unit = useSelector(s => s.profile.lengthUnit)
  const measurements = useSelector(s => s.measurement)
  const sites = useSelector(s => s.measurementSite)

  const reversed = useMemo(() =>
    measurements
      .map(w => normalize(w, unit))
      .sort((a, b) => b.created.getTime() - a.created.getTime()),
    [measurements, unit]
  )

  return (
    <div>
      <h2 className='text-xl mb-4'>Recent measurements</h2>
      <div>
        { reversed.map((m, index) => (
            <StripedRow
              key={ m.created }
              index={ measurements.length - index }
            >
              <NavLink
                exact
                to={ routes.trackEditMeasurement.toPath(m.id) }
                className='p-2 flex justify-between md:grid md:grid-cols-2'
              >
                <div className='flex items-center -ml-3 md:ml-0'>
                  <EditPencil />
                  <p className='md:pl-4'>
                    { `${ m.value }${ m.unit } ${ sites[m.site].name } ${ m.side !== 'N/A' ? m.side : '' }${ m.flexed ? ' flexed' : '' }` }
                  </p>
                </div>
                <ResponsiveDate date={ m.created } />
              </NavLink>
            </StripedRow>
        ))}
      </div>
    </div>
  )
}

export default History