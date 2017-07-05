import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ type }) => <div>Block type Checkbox</div>;

export default Checkbox;

Checkbox.defaultProps = {
  type: "",
};

Checkbox.propTypes = {
  type: PropTypes.string,
};
