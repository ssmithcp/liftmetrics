import { useEffect } from 'react'
import { connect } from 'react-redux'

import { getMeasurementSites } from '../../../actions/measurementSite'
// import { getMeasurements } from '../../../actions/mesaurement'

import ThreeCardLayout from '../ThreeCardLayout'

import Record from './Record'
import Trends from './Trends'
import History from './History'

const Measurement = ({ getMeasurementSites }) => {
  useEffect(getMeasurementSites, [getMeasurementSites])
  // useEffect(getMeasurements, [getMeasurements])

  return <ThreeCardLayout
      title='Measurements'
      TopLeft={ Record }
      TopRight={ Trends }
      Bottom={ History }
    />
}

export default connect(null, { getMeasurementSites })(Measurement)