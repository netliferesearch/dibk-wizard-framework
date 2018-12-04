import PropTypes from 'prop-types';
import React from 'react';
import { template } from 'lodash';

export default function VariableText({ data, text }) {
  if (!text) {
    return null;
  }
  const compiled = template(text);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: compiled(data) }} />;
}

VariableText.defaultProps = {
  data: {},
  text: '',
};

VariableText.propTypes = {
  data: PropTypes.any,
  text: PropTypes.string,
};
