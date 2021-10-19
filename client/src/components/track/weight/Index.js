import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getWeights } from '../../../actions/weight';

import ThreeCardLayout from '../ThreeCardLayout';

import Record from './Record';
import Trends from './Trends';
import History from './History';

const Weight = ({ getWeights }) => {
  useEffect(getWeights, [getWeights]);

  return <ThreeCardLayout
    title='Body weight'
    TopLeft={ Record }
    TopRight={ Trends }
    Bottom={ History }
  />;
};

export default connect(null, { getWeights })(Weight);