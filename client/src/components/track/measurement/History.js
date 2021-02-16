import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import routes from '../../navigation'
import { normalize } from '../../../util/length'

import ResponsiveDate from '../ResponsiveDate'
import TitledHistory from '../TitledHistory'

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
    <TitledHistory
      title='Recent measurements'
      rowData={ reversed }
      toPath={ m => routes.trackEditMeasurement.toPath(m.id) }
      renderName={ m => `${ sites ? sites[m.site].name : 'unknown' } ${ m.side !== 'N/A' ? m.side : '' }${ m.flexed ? ' flexed' : '' } - ${ m.value }${ m.unit }` }
      renderDescription={ m => <ResponsiveDate date={ m.created } /> }
    />
  )
}

export default History