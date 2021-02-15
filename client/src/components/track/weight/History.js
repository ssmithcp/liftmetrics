import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import routes from '../../navigation'
import { normalize } from '../../../util/weight'

import TitledHistory from '../TitledHistory'
import ResponsiveDate from '../ResponsiveDate'
import WeightDisplay from '../WeightDisplay'

const History = () => {
  const unit = useSelector(s => s.profile.weightUnit)
  const weights = useSelector(s => s.weight)

  const reversed = useMemo(() =>
    weights
      .map(w => normalize(w, unit))
      .sort((a, b) => b.created.getTime() - a.created.getTime()),
    [weights, unit]
  )

  return (
    <TitledHistory
      title='Recent weigh-ins'
      rowData={ reversed }
      toPath={ w => routes.trackEditWeight.toPath(w.id) }
      renderName={ w => <WeightDisplay value={ w.value } /> }
      renderDescription={ w => <ResponsiveDate date={ w.created } /> }
    />
  )
}

export default History