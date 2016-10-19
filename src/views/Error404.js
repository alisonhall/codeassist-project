import React from 'react';
import { Link } from 'react-router';

const Error404 = () => (
  <div>
    <h1>404 - Page Not Found</h1>
    <p><Link to="/">Back to home</Link></p>
  </div>
);

export default Error404;
