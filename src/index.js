import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import jqueryui from 'jquery-ui';

// Components
import Page from './components/Page/Page.js';
// import Test from './components/Test/Test.js';

// Styles
import './styles/normalize.css';
import './styles/global.scss';


// ReactDOM.render(
//   <Test />,
//   document.getElementById('react-page')
// );

ReactDOM.render(
  <Page />,
  document.getElementById('react-page')
);
