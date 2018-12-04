import { merge } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import defaultStyles from '../styles';

export default class Theme extends Component {
  static propTypes = {
    styles: PropTypes.object,
  };

  static childContextTypes = {
    styles: PropTypes.object,
  };

  static defaultProps = {
    styles: {},
  };

  getChildContext = () => ({
    styles: merge({}, defaultStyles, this.props.styles),
  });

  render() {
    return <p>Make this a theme decorator for wizard somehow</p>;
  }
}
