import { merge } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import defaultStyles from '../styles';

export default class StyleProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    styles: PropTypes.object,
  };

  static childContextTypes = {
    styles: PropTypes.object,
  };

  static defaultProps = {
    styles: {},
  };

  getChildContext() {
    return {
      styles: merge({}, defaultStyles, this.props.styles),
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}
