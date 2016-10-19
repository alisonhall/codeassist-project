import React from 'react';
import { Route, IndexRoute } from 'react-router';

import CoreLayout from 'layouts/CoreLayout';

// import IndexView from 'views/IndexView';

import HomeView from './../views/HomeView.js';
import AboutView from './../views/AboutView.js';
import UserSettingsView from './../views/UserSettingsView.js';
import LoginView from './../views/LoginView.js';
import CategoryView from './../views/CategoryView.js';
import SearchResultsView from './../views/SearchResultsView.js';
import CreateSnippetView from './../views/CreateSnippetView.js';
import OpenedSyntaxCardView from './../views/OpenedSyntaxCardView.js';
import OpenedExampleCardView from './../views/OpenedExampleCardView.js';
import Error404 from './../views/Error404.js';


const routes = (
  <Route path="/" component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path="about" component={AboutView} />
    <Route path="user" component={UserSettingsView} />
    <Route path="login" component={LoginView} />
    <Route path="create" component={CreateSnippetView} />
    <Route path="search" component={SearchResultsView}>
    	<Route path=":category" component={CategoryView} />
    	<Route path=":syntax" component={OpenedSyntaxCardView} />
    	<Route path=":example" component={OpenedExampleCardView} />
    </Route>
    <Route path="category" component={CategoryView}>
    	<Route path=":category" component={OpenedSyntaxCardView} />
    	<Route path=":category" component={OpenedExampleCardView} />
    </Route>

    <Route path="*" component={Error404} />
  </Route>
);

export default routes;
