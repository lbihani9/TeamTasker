import React from 'react';
import PropTypes from 'prop-types';

const Logout = props => {
  return (
    <span
      class='material-symbols-sharp'
      style={{
        position: 'absolute',
        bottom: '1em',
        fontSize: '3em',
        color: '#808080',
        cursor: 'pointer',
      }}
    >
      account_circle
    </span>
  );
};

Logout.propTypes = {};

export default Logout;
