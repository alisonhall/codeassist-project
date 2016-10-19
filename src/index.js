import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import jqueryui from 'jquery-ui';

// Components
import Page from './components/Page/Page.js';
// import Test from './components/Test/Test.js';

// Styles
import './styles/global.scss';
import './styles/normalize.css';


// ReactDOM.render(
//   <Test />,
//   document.getElementById('react-page')
// );

ReactDOM.render(
  <Page />,
  document.getElementById('react-page')
);
