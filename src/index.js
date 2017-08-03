import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// Components
import Page from './components/Page/Page.js';

// Styles
import './styles/normalize.css';
import './styles/global.scss';

ReactDOM.render(
  <Router>
    <Page />
  </Router>
  , document.getElementById('react-page')
);
