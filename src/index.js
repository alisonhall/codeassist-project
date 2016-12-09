import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import jqueryui from 'jquery-ui';
// import {Router, Route, Navigation} from 'react-router';
// import { Router, Route, Link, browserHistory } from 'react-router'
// import { Router, Route, IndexRoute, Link, hashHistory, Nagivation, browserHistory } from 'react-router';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, DefaultRoute } from 'react-router';
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
import CreateCategoryView from './views/CreateCategoryView.js';
import CreateSnippetView from './views/CreateSnippetView.js';
import OpenedExampleCardView from './views/OpenedExampleCardView.js';
import Error404 from './views/Error404.js';


import About from './components/About/About.js';
import Accordion from './components/Accordion/Accordion.js';
import CategoriesSidebar from './components/CategoriesSidebar/CategoriesSidebar.js';
import CategoryInfo from './components/CategoryInfo/CategoryInfo.js';
import CreateCategory from './components/CreateCategory/CreateCategory.js';
import CreateSnippet from './components/CreateSnippet/CreateSnippet.js';
import ExampleCards from './components/ExampleCards/ExampleCards.js';
import Examples from './components/Examples/Examples.js';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Home from './components/Home/Home.js';
import Languages from './components/Languages/Languages.js';
import Login from './components/Login/Login.js';
import NoContent from './components/NoContent/NoContent.js';
import NoLanguage from './components/NoLanguage/NoLanguage.js';
import OpenExampleCard from './components/OpenExampleCard/OpenExampleCard.js';
// import Page from './components/Page/Page.js';
import SearchResults from './components/SearchResults/SearchResults.js';
import Test from './components/Test/Test.js';
import UserSettings from './components/UserSettings/UserSettings.js';

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

    <Route path="/test" component={Test} />
    <Route path="/test/about" component={About} />
    <Route path="/test/accordion" component={Accordion} />
    <Route path="/test/categoriessidebar" component={CategoriesSidebar} />
    <Route path="/test/categoryinfo" component={CategoryInfo} />
    <Route path="/test/createcategory" component={CreateCategory} />
    <Route path="/test/createsnippet" component={CreateSnippet} />
    <Route path="/test/examplecards" component={ExampleCards} />
    <Route path="/test/examples" component={Examples} />
    <Route path="/test/footer" component={Footer} />
    <Route path="/test/header" component={Header} />
    <Route path="/test/home" component={Home} />
    <Route path="/test/languages" component={Languages} />
    <Route path="/test/login" component={Login} />
    <Route path="/test/nocontent" component={NoContent} />
    <Route path="/test/nolanguage" component={NoLanguage} />
    <Route path="/test/openexamplecard" component={OpenExampleCard} />
    <Route path="/test/searchresults" component={SearchResults} />
    <Route path="/test/usersettings" component={UserSettings} />

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
