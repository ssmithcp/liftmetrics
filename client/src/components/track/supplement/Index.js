import { useEffect } from 'react'
import { connect } from 'react-redux'

import { getConsumedSupplements } from '../../../actions/consumedSupplement'
import { getSupplements } from '../../../actions/supplement'

import ThreeCardLayout from '../ThreeCardLayout'

import Record from './Record'
import Trends from './Trends'
import History from './History'

const Supplement = ({ getConsumedSupplements, getSupplements }) => {
  useEffect(getConsumedSupplements, [getConsumedSupplements])
  useEffect(getSupplements, [getSupplements])

  return <ThreeCardLayout
      title='Supplements'
      TopLeft={ Record }
      TopRight={ Trends }
      Bottom={ History }
    />
}

export default connect(null, { getConsumedSupplements, getSupplements })(Supplement)