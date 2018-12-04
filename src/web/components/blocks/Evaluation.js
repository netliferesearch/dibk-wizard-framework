import PropTypes from 'prop-types';
import React from 'react';
import { get } from 'lodash';

import StyledSum from '../../primitives/Sum';
import StyledSumResult from '../../primitives/SumResult';
import Html from '../helper/Html';

export default function Evaluation({
  data,
  testing,
  final,
  groupedSimple,
  happy,
  sad,
  showValue,
  unit,
}) {
  let testedValue;
  if (Array.isArray(testing)) {
    testedValue = get(data, testing[0]) - get(data, testing[1]);
  } else {
    testedValue = get(data, testing);
  }
  const absTestedValue = Math.abs(testedValue);
  if (showValue) {
    if (testedValue < 0) {
      return (
        <StyledSum groupedSimple={groupedSimple} final={final}>
          <div>
            {sad}
            <span className="sad">
              {absTestedValue} {unit ? <Html inline text={unit} /> : null}
            </span>
          </div>
        </StyledSum>
      );
    }
    return (
      <StyledSum groupedSimple={groupedSimple} final={final}>
        <div>
          {happy}
          <span className="happy">
            {testedValue} {unit ? <Html inline text={unit} /> : null}
          </span>
        </div>
      </StyledSum>
    );
  }

  if (testedValue < 0) {
    // sad case
    return (
      <StyledSumResult>
        <div className="sad">{sad}</div>
      </StyledSumResult>
    );
  }
  // happy case
  return (
    <StyledSumResult>
      <div className="happy">{happy}</div>
    </StyledSumResult>
  );
}

Evaluation.defaultProps = {
  currentValue: undefined,
  details: '',
  final: false,
  groupedSimple: false,
  minimum: undefined,
  operations: [],
  property: undefined,
  showValue: false,
  summary: '',
  unit: '',
  values: [],
};

Evaluation.propTypes = {
  data: PropTypes.object.isRequired,
  testing: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired])
    .isRequired,
  final: PropTypes.bool,
  groupedSimple: PropTypes.bool,
  happy: PropTypes.string.isRequired,
  sad: PropTypes.string.isRequired,
  showValue: PropTypes.bool,
  unit: PropTypes.string,
};
