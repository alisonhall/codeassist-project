import React, { PropTypes } from 'react';
// import 'constants/global_context';
import 'styles/global';

const CoreLayout = ({ children }) => (
  <div className="content">
    {children}
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.node
};

export default CoreLayout;
