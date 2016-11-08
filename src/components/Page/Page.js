import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';
import firebase from 'firebase';
// import firebaseApp from 'firebase/app';
// import firebaseAuth from 'firebase/auth';
// import database from 'firebase/database';
// var gcloud = require('google-cloud');
// var gcs = gcloud.storage();
// var bucket = gcs.bucket('code-assist.appspot.com');
// import base from './../../base.js';
// import app from './../../base.js';

var Rebase = require('re-base');

var base = Rebase.createClass({
	apiKey: "AIzaSyAnEDbmWbdr72O2IeCY1Qicj3c4LLkL9cU",
	authDomain: "code-assist.firebaseapp.com",
	databaseURL: "https://code-assist.firebaseio.com",
	storageBucket: "code-assist.appspot.com"
});

// Components
import About from './../About/About.js';
import Accordion from './../Accordion/Accordion.js';
import CategoriesSidebar from './../CategoriesSidebar/CategoriesSidebar.js';
import CreateSnippet from './../CreateSnippet/CreateSnippet.js';
import EditMenu from './../EditMenu/EditMenu.js';
import ExampleCards from './../ExampleCards/ExampleCards.js';
import Examples from './../Examples/Examples.js';
import Footer from './../Footer/Footer.js';
import Header from './../Header/Header.js';
import Home from './../Home/Home.js';
import Languages from './../Languages/Languages.js';
import Login from './../Login/Login.js';
import NoContent from './../NoContent/NoContent.js';
import NoLanguage from './../NoLanguage/NoLanguage.js';
import OpenExampleCard from './../OpenExampleCard/OpenExampleCard.js';
import OpenSyntaxCard from './../OpenSyntaxCard/OpenSyntaxCard.js';
// import Page from './../Page/Page.js';
import SearchResults from './../SearchResults/SearchResults.js';
import SyntaxCards from './../SyntaxCards/SyntaxCards.js';
import UserSettings from './../UserSettings/UserSettings.js';

// Styles
import './page.scss';


class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryDataLoaded: false,
			languageDataLoaded: false,
			exampleDataLoaded: false,
			userDataLoaded: false,
			commentDataLoaded: false,
			allDataLoaded: false,
			topCategoryDataLoaded: false,
			selectedLanguagesDataLoaded: false,
			currentUserDataLoaded: false,

			allCategories: [],
			allLanguages: [],
			allExamples: [],
			allUsers: [],
			allComments: [],
			
			topCategories: [],
			selectedLanguages: [],

			contentComponent: '',
			currentUser: '',
		};

		this.addToSelectedLanguages = this.addToSelectedLanguages.bind(this);
		this.removeSelectedLanguage = this.removeSelectedLanguage.bind(this);
		this.addExample = this.addExample.bind(this);

		this.refCategories;
		this.refTopCategories;
		this.refComments;
		this.refExamples;
		this.refLanguages2;
		this.refSelectedLanguages;
		this.refUsers;
		this.refCurrentUser;
	}


	componentWillMount() {
		// this runs right before the <Page> is rendered
		console.log("Loading data...");
		this.refCategories = base.syncState('categories', {
			context: this,
			state: 'allCategories',
			asArray: true,
			then: this.setState({categoryDataLoaded: true})
		});
		this.refTopCategories = base.syncState('topCategories', {
			context: this,
			state: 'topCategories',
			asArray: true,
			then: this.setState({topCategoryDataLoaded: true})
		});
		this.refComments = base.syncState('comments', {
			context: this,
			state: 'allComments',
			asArray: true,
			then: this.setState({commentDataLoaded: true})
		});
		this.refExamples = base.syncState('examples', {
			context: this,
			state: 'allExamples',
			asArray: true,
			then: this.setState({exampleDataLoaded: true})
		});
		this.refLanguages2 = base.syncState('languages2', {
			context: this,
			state: 'allLanguages',
			asArray: true,
			then: this.setState({languageDataLoaded: true})
		});
		this.refSelectedLanguages = base.syncState('selectedLanguages', {
			context: this,
			state: 'selectedLanguages',
			asArray: true,
			then: this.setState({selectedLanguagesDataLoaded: true})
		});
		this.refUsers = base.syncState('users', {
			context: this,
			state: 'allUsers',
			asArray: true,
			then: this.setState({userDataLoaded: true})
		});
		this.refCurrentUser = base.syncState('currentUser', {
			context: this,
			state: 'currentUser',
			asArray: true,
			then: this.setState({currentUserDataLoaded: true})
		});

		// if(categoryDataLoaded && topCategoryDataLoaded && commentDataLoaded && exampleDataLoaded && languageDataLoaded && selectedLanguagesDataLoaded && userDataLoaded) {
		// 	this.setState({ allDataLoaded: true });
		// 	console.log("componentWillMount() END");
		// }

		// console.log(this.refCategories);

		// check if there is any order in localStorage
		// const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		// if (localStorageRef) {
		// 	// update our App component's order state
		// 	this.setState({
		// 		order: JSON.parse(localStorageRef)
		// 	});
		// }

	}

	componentDidMount() {
		if(this.state.categoryDataLoaded && this.state.topCategoryDataLoaded && this.state.commentDataLoaded && this.state.exampleDataLoaded && this.state.languageDataLoaded && this.state.selectedLanguagesDataLoaded && this.state.userDataLoaded && this.state.currentUserDataLoaded) {
			this.setState({ allDataLoaded: true });
			console.log("All Data Loaded");
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.refCategories);
		base.removeBinding(this.refTopCategories);
		base.removeBinding(this.refComments);
		base.removeBinding(this.refExamples);
		base.removeBinding(this.refLanguages2);
		base.removeBinding(this.refSelectedLanguages);
		base.removeBinding(this.refUsers);
		base.removeBinding(this.refCurrentUser);
	}


	addToSelectedLanguages(key) {
		var selectedLanguages = this.state.selectedLanguages;
		if(selectedLanguages.length >= 3) {
			alert("You can't add more than 3 languages.");
		} else {
			selectedLanguages.push(key);
			this.setState({selectedLanguages: selectedLanguages});
		}
	}

	removeSelectedLanguage(key) {
		var selectedLanguages = this.state.selectedLanguages;
		selectedLanguages.splice(key, 1);
		this.setState({selectedLanguages: selectedLanguages});
	}

	addExample(object, index) {
		console.log(object, index);
		var allExamples = this.state.allExamples;
		allExamples[index] = object;
		this.setState({allExamples: allExamples});
	}

	render() {
		
		if (this.state.allDataLoaded) {
			var languagesComponent = 
					<Languages 
						allLanguages={this.state.allLanguages}
						selectedLanguages={this.state.selectedLanguages} 
						addToSelectedLanguages={this.addToSelectedLanguages}
						removeSelectedLanguage={this.removeSelectedLanguage}
					/>;

			var categoriesComponent = 
					<CategoriesSidebar
						allCategories={this.state.allCategories} 
						topCategories={this.state.topCategories} 
						allDataLoaded={this.state.allDataLoaded} 
					/>;

			var categoryComponent = 
					<Examples 
						allCategories={this.state.allCategories} 
						allExamples={this.state.allExamples} 
						allLanguages={this.state.allLanguages} 
						allUsers={this.state.allUsers} 
						allComments={this.state.allComments} 
						allDataLoaded={this.state.allDataLoaded} 
						params={this.props.params}
						selectedLanguages={this.state.selectedLanguages}
					/>;

			var aboutComponent = 
					<About />;

			var createSnippetComponent = 
					<CreateSnippet 
						allCategories={this.state.allCategories}
						allLanguages={this.state.allLanguages}
						newId={this.state.allExamples.length}
						user={this.state.allUsers[this.state.currentUser]}
						addExample={this.addExample}
					/>;

			var error404Component = 
					<h1>Page Not Found</h1>;

			var homeComponent = 
					<Home />;

			var loginComponent = 
					<Login />;

			var openExampleCardComponent = 
					<OpenExampleCard 
						allCategories={this.state.allCategories} 
						allExamples={this.state.allExamples} 
						allLanguages={this.state.allLanguages} 
						allUsers={this.state.allUsers} 
						allComments={this.state.allComments} 
						allDataLoaded={this.state.allDataLoaded} 
						params={this.props.params}
						selectedLanguages={this.state.selectedLanguages}
					/>;

			var openSyntaxCardComponent = 
					<OpenSyntaxCard 
						allCategories={this.state.allCategories} 
						allExamples={this.state.allExamples} 
						allLanguages={this.state.allLanguages} 
						allUsers={this.state.allUsers} 
						allComments={this.state.allComments} 
						allDataLoaded={this.state.allDataLoaded} 
						params={this.props.params}
						selectedLanguages={this.state.selectedLanguages}
					/>;

			var searchResultsComponent = 
					<SearchResults />;

			var userSettingsComponent = 
					<UserSettings />;

			var editMenuComponent = 
					<EditMenu />;

			var contentComponentStr = this.props.contentComponent;
			var contentComponent;

			if (contentComponentStr == 'about') {
				contentComponent = aboutComponent;
			} else if (contentComponentStr == 'category') {
				contentComponent = categoryComponent;
			} else if (contentComponentStr == 'createsnippet') {
				contentComponent = createSnippetComponent;
			} else if (contentComponentStr == 'error404') {
				contentComponent = error404Component;
			} else if (contentComponentStr == 'home') {
				contentComponent = homeComponent;
			} else if (contentComponentStr == 'login') {
				contentComponent = loginComponent;
			} else if (contentComponentStr == 'openedexamplecard') {
				contentComponent = openExampleCardComponent;
			} else if (contentComponentStr == 'openedsyntaxcard') {
				contentComponent = openSyntaxCardComponent;
			} else if (contentComponentStr == 'searchresults') {
				contentComponent = searchResultsComponent;
			} else if (contentComponentStr == 'usersettings') {
				contentComponent = userSettingsComponent;
			} else {
				<h1>Error! Unknown Content Component!</h1>
			}

			return (
				<div className="page-container">
					<Header />
		
					<aside id="categories" className="col-md-2">
						<div id="react-categories">
							{categoriesComponent}
						</div>
					</aside>

					<div className="container-fluid">
						<section id="languages">
							<div id="react-languages" className="col-md-12">
								{languagesComponent}
							</div>
						</section>

						<section id="content" className="col-md-11 col-md-offset-1">
							{contentComponent}
						</section>

						<EditMenu />
					</div>

					<Footer />
				</div>
			);

		} else {
			
			return (
				<div 
					className="page-container" 
					key={this.state.allDataLoaded}>
						Loading...
				</div>

			);
		}
	}
}

Page.propTypes = {
	contentComponent: PropTypes.string,
	params: PropTypes.object
};

// Page.defaultProps = {
// 	allDataLoaded: false
// };

export default Page;
