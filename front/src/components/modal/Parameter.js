import React from 'react';
import PropTypes from 'prop-types';

const Parameter = ({ label, value, onChange }) => (
  <div className="parameter-container">
    
  </div>
);

Parameter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Parameter;
