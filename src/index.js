import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import jqueryui from 'jquery-ui';
// import {Router, Route, Navigation} from 'react-router';
// import { Router, Route, Link, browserHistory } from 'react-router'
import { Router, Route, IndexRoute, Link, hashHistory, Nagivation, browserHistory } from 'react-router';
// var createBrowserHistory = require('history/lib/createBrowserHistory');

// Components
import Page from './components/Page/Page.js';
// import Test from './components/Test/Test.js';
import HomeView from './views/HomeView.js';
import AboutView from './views/AboutView.js';
import UserSettingsView from './views/UserSettingsView.js';
import LoginView from './views/LoginView.js';
import CategoryView from './views/CategoryView.js';
import SearchResultsView from './views/SearchResultsView.js';
import CreateSnippetView from './views/CreateSnippetView.js';
import OpenedSyntaxCardView from './views/OpenedSyntaxCardView.js';
import OpenedExampleCardView from './views/OpenedExampleCardView.js';
import Error404 from './views/Error404.js';

// Styles
import './styles/normalize.css';
import './styles/global.scss';



// class App extends Component {
//     return (
//       <Page>
//         {this.state.children}
//       </Page>
//     );
// }




const routes = (
  <Router history={hashHistory}>
    <Route path="/" component={CategoryView} />
      <Route path="/about" component={AboutView} />
      <Route path="/user" component={UserSettingsView} />
      <Route path="/login" component={LoginView} />
      <Route path="/create" component={CreateSnippetView} />
      <Route path="/search" component={SearchResultsView} />
      	<Route path="/category" component={CategoryView} />
      	<Route path="/syntax" component={OpenedSyntaxCardView} />
      	<Route path="/example" component={OpenedExampleCardView} />

      <Route path="*" component={Error404} />
  </Router>
);

// const routes = (
//   <Router history={hashHistory}>
//     <Route path="/" component={App} >
//       <IndexRoute component={HomeView} />
//       <Route path="about" component={AboutView} />
//       <Route path="user" component={UserSettingsView} />
//       <Route path="login" component={LoginView} />
//       <Route path="create" component={CreateSnippetView} />
//       <Route path="search" component={SearchResultsView}>
//         <Route path="/:category" component={CategoryView} />
//         <Route path="/:syntax" component={OpenedSyntaxCardView} />
//         <Route path="/:example" component={OpenedExampleCardView} />
//       </Route>
//       <Route path="category" component={CategoryView}>
//         <Route path="/:syntax" component={OpenedSyntaxCardView} />
//         <Route path="/:example" component={OpenedExampleCardView} />
//       </Route>

//       <Route path="*" component={Error404} />
//     </Route>
//   </Router>
// );



// ReactDOM.render(
//   <Test />,
//   document.getElementById('react-page')
// );

ReactDOM.render(
  routes,
  document.getElementById('react-page')
);
