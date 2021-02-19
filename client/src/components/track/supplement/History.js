import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import routes from '../../navigation'
import { round } from '../../../util/number'

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
        toPath={ m => routes.trackEditConsumedSupplement.toPath(m.id) }
        renderName={ m => `${ supplements[m.supplement].name } - ${ round(m.servings * supplements[m.supplement].value) } ${ supplements[m.supplement].unit }` }
        renderDescription={ m => <ResponsiveDate date={ m.created } /> }
      />
    : <></>
  )
}

export default History