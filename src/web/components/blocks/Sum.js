import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash.get';

import StyledSum from '../../primitives/Sum';
import SummaryDetails from './SummaryDetails';
import Html from '../helper/Html';

export default function Sum({
  data,
  details,
  final,
  minimum,
  operations,
  summary,
  heading,
  unit,
  values,
  groupedSimple,
}) {
  const sum = values.reduce((accumulator, currentValue, currentIndex) => {
    if (operations[currentIndex] === '-') {
      return Math.max(accumulator - get(data, currentValue), minimum);
    } else if (operations[currentIndex] === '*') {
      return Math.max(accumulator * get(data, currentValue), minimum);
    } else if (operations[currentIndex] === '/') {
      return Math.max(accumulator / get(data, currentValue), minimum);
    }
    return Math.max(accumulator + get(data, currentValue), minimum);
  }, 0);
  return (
    <StyledSum groupedSimple={groupedSimple} final={final}>
      <p>
        {heading}
        <span>
          {sum} {unit ? <Html inline text={unit} /> : null}
        </span>
      </p>
      {summary && <SummaryDetails summary={summary} details={details} />}
    </StyledSum>
  );
}

Sum.defaultProps = {
  details: '',
  final: false,
  summary: '',
  heading: '',
  unit: '',
  values: [],
  operations: [],
  minimum: undefined,
  groupedSimple: false,
};

Sum.propTypes = {
  data: PropTypes.object.isRequired,
  details: PropTypes.string,
  final: PropTypes.bool,
  minimum: PropTypes.number,
  operations: PropTypes.array,
  summary: PropTypes.string,
  heading: PropTypes.string,
  unit: PropTypes.string,
  values: PropTypes.array,
  groupedSimple: PropTypes.bool,
};
