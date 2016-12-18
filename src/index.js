import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute } from 'react-router';

// Components
import Page from './components/Page/Page.js';
import HomeView from './views/HomeView.js';
import AboutView from './views/AboutView.js';
import UserSettingsView from './views/UserSettingsView.js';
import LoginView from './views/LoginView.js';
import CategoryView from './views/CategoryView.js';
import SearchResultsView from './views/SearchResultsView.js';
import CreateCategoryView from './views/CreateCategoryView.js';
import CreateSnippetView from './views/CreateSnippetView.js';
import OpenedExampleCardView from './views/OpenedExampleCardView.js';
import Error404 from './views/Error404.js';

// Styles
import './styles/normalize.css';
import './styles/global.scss';


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HomeView} />
    <Route path="/home" component={HomeView} />
    <Route path="/about" component={AboutView} />
    <Route path="/login" component={LoginView} />
    <Route path="/create/category" component={CreateCategoryView} />
    <Route path="/create/snippet" component={CreateSnippetView} />
    <Route path="/user/(:userId)" component={UserSettingsView} />
    <Route path="/search/(:searchTerm)" component={SearchResultsView} />
  	<Route path="/category/(:categoryId)" component={CategoryView} />
  	<Route path="/example/(:exampleId)" component={OpenedExampleCardView} />
    <Route path="*" component={Error404} />
  </Router>
);

ReactDOM.render(
  routes,
  document.getElementById('react-page')
);
