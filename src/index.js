import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// Components
import Page from './components/Page/Page.js';
// import HomeView from './views/HomeView.js';
// import AboutView from './views/AboutView.js';
// import UserSettingsView from './views/UserSettingsView.js';
// import LoginView from './views/LoginView.js';
// import CategoryView from './views/CategoryView.js';
// import SearchResultsView from './views/SearchResultsView.js';
// import CreateCategoryView from './views/CreateCategoryView.js';
// import CreateSnippetView from './views/CreateSnippetView.js';
// import OpenedExampleCardView from './views/OpenedExampleCardView.js';
// import Error404 from './views/Error404.js';

// Styles
import './styles/normalize.css';
import './styles/global.scss';


// const routes = (
//   <Router history={browserHistory}>
//     <Route path="/" component={Page} />
//     <Route path="/home" component={Page} />
//     <Route path="/about" component={Page} />
//     <Route path="/login" component={Page} />
//     <Route path="/create/category" component={Page} />
//     <Route path="/create/snippet" component={Page} />
//     <Route path="/user/(:userId)" component={Page} />
//     <Route path="/search/(:searchTerm)" component={Page} />
//   	<Route path="/category/(:categoryId)" component={Page} />
//   	<Route path="/example/(:exampleId)" component={Page} />
//     <Route path="*" component={Error404} />
//   </Router>
// );

ReactDOM.render(
  <Router>
    <Page />
  </Router>
  , document.getElementById('react-page')
);
