import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { NAME } from '../../../state';

import { Value as StyledValue } from '../../../primitives/Summary';

function hasAllValues(values, data) {
  return values.reduce((acc, currentValue) => get(data, currentValue) !== undefined && acc, true);
}

function Sum({ node, data }) {
  const { minimum, operations, values } = node;
  if (!hasAllValues(values, data)) {
    return <StyledValue missing>* Mangler verdi for utregning</StyledValue>;
  }

  const sum = values.reduce((accumulator, currentValue, currentIndex) => {
    if (operations && operations[currentIndex] === '-') {
      return Math.max(accumulator - get(data, currentValue), minimum);
    } else if (operations && operations[currentIndex] === '*') {
      return Math.max(accumulator * get(data, currentValue), minimum);
    } else if (operations && operations[currentIndex] === '/') {
      return Math.max(accumulator / get(data, currentValue), minimum);
    }
    return Math.max(accumulator + get(data, currentValue), minimum);
  }, 0);
  return <StyledValue>{sum}</StyledValue>;
}

const ConnectedSum = connect(state => ({
  data: state[NAME],
}))(Sum);

export default ConnectedSum;

Sum.propTypes = {
  node: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};
