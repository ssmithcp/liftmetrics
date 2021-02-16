import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import routes from '../../navigation'

import ResponsiveDate from '../ResponsiveDate'
import TitledHistory from '../TitledHistory'

const History = () => {
  const consumedSupplements = useSelector(s => s.consumedSupplement)
  const supplements = useSelector(s => s.supplement)

  const reversed = useMemo(() =>
    consumedSupplements
      .sort((a, b) => b.created.getTime() - a.created.getTime()),
    [consumedSupplements]
  )

  return (
    supplements && Object.keys(supplements).length > 0
    ? <TitledHistory
        title='Recent supplements'
        rowData={ reversed }
        toPath={ m => routes.trackEditMeasurement.toPath(m.id) }
        renderName={ m => `${ supplements[m.supplement].name } - ${ m.servings } x ${ supplements[m.supplement].value }${ supplements[m.supplement].unit }` }
        renderDescription={ m => <ResponsiveDate date={ m.created } /> }
      />
    : <></>
  )
}

export default History