import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { get } from 'lodash';

import StyledSum from '../../primitives/Sum';
import SummaryDetails from './SummaryDetails';
import Html from '../helper/Html';

const calculateSum = (data, values, operations, minimum = 0) => {
  let sum = values.reduce((accumulator, cur, currentIndex) => {
    if (operations && operations[currentIndex] === '-') {
      return accumulator - get(data, cur, 0);
    } else if (operations && operations[currentIndex] === '%') {
      return (accumulator * cur).toFixed(2);
    } else if (operations && operations[currentIndex] === '*') {
      return accumulator * get(data, cur, 1);
    } else if (operations && operations[currentIndex] === '-/') {
      return get(data, cur, 0) / accumulator;
    } else if (operations && operations[currentIndex] === '/') {
      return accumulator / get(data, cur, 1);
    }
    return accumulator + get(data, cur, 0);
  }, 0);

  if (typeof minimum === 'number') {
    sum = Math.max(sum, minimum);
  }

  return sum;
};

export default class Sum extends Component {
  componentDidMount() {
    const { property, data, setData } = this.props;
    // eslint-disable-next-line eqeqeq
    if (get(data, property) !== this.sum) {
      setData(property, this.sum);
    }
  }

  componentDidUpdate() {
    const { data, property, setData } = this.props;
    // eslint-disable-next-line eqeqeq
    if (get(data, property) !== this.sum) {
      setData(property, this.sum);
    }
  }

  render() {
    const {
      groupedSimple,
      final,
      unit,
      data,
      heading,
      summary,
      details,
      values,
      operations,
      minimum,
    } = this.props;

    this.sum = calculateSum(data, values, operations, minimum);

    return (
      <StyledSum groupedSimple={groupedSimple} final={final}>
        <div>
          {heading}
          <span>
            {this.sum} {unit ? <Html inline text={unit} /> : null}
          </span>
        </div>
        {summary && <SummaryDetails summary={summary} details={details} />}
      </StyledSum>
    );
  }
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
  property: undefined,
  currentValue: undefined,
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
  property: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};
