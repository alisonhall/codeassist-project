import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Components
import About from './../About/About.js';
import Accordion from './../Accordion/Accordion.js';
import Categories from './../Categories/Categories.js';
import CreateSnippet from './../CreateSnippet/CreateSnippet.js';
import ExampleCards from './../ExampleCards/ExampleCards.js';
import Examples from './../Examples/Examples.js';
import Footer from './../Footer/Footer.js';
import Header from './../Header/Header.js';
import Home from './../Home/Home.js';
import Languages from './../Languages/Languages.js';
import Login from './../Login/Login.js';
import NoContent from './../NoContent/NoContent.js';
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
			allCategories: [],
			topCategories: [],
			allLanguages: [],
			selectedLanguages: [],
			allExamples: [],
			allUsers: [],
			allComments: [],
			contentComponent: ''
		};

		this.add = this.add.bind(this);
		this.addToSelectedLanguages = this.addToSelectedLanguages.bind(this);
	}

	componentWillMount() {


		var self = this;
		$.getJSON('../../test-data.json', function(results){
			$.each(results.categories, function(index, item) {
				self.add(item, index, 'allCategories');
				this.setState({categoryDataLoaded: true});
			}.bind(this));
			$.each(results.languages2, function(el, item) {
				self.add(item, el, 'allLanguages');
				this.setState({languageDataLoaded: true});
			}.bind(this));
			$.each(results.examples, function(index, item) {
				self.add(item, index, 'allExamples');
				this.setState({exampleDataLoaded: true});
			}.bind(this));
			$.each(results.users, function(index, item) {
				self.add(item, index, 'allUsers');
				this.setState({userDataLoaded: true});
			}.bind(this));
			$.each(results.comments, function(index, item) {
				self.add(item, index, 'allComments');
				this.setState({commentDataLoaded: true});
			}.bind(this));
			this.setState({allDataLoaded: true});

		}.bind(this));

		// this.setComponents();
	}


	add(item, index, stateName) {
		if (stateName == 'allCategories') {

			var allCategories = this.state.allCategories;
			var topCategories = this.state.topCategories;
			allCategories[index] = item;
			if(item.isTopLevel){
				topCategories.push(index);
			}
			this.setState({allCategories: allCategories, topCategories: topCategories});

		} else if (stateName == 'allLanguages') {

			var allLanguages = this.state.allLanguages;
			allLanguages[index] = item;
			this.setState({allLanguages: allLanguages});

		} else if (stateName == 'allExamples') {

			var allExamples = this.state.allExamples;
			allExamples[index] = item;
			this.setState({allExamples: allExamples});

		} else if (stateName == 'allUsers') {

			var allUsers = this.state.allUsers;
			allUsers[index] = item;
			this.setState({allUsers: allUsers});

		} else if (stateName == 'allComments') {

			var allComments = this.state.allComments;
			allComments[index] = item;
			this.setState({allComments: allComments});

		} else {
			alert("Error: Unknown state");
		}
	}

	addToSelectedLanguages(key) {
		console.log(key);
		var selectedLanguages = this.state.selectedLanguages;
		if(selectedLanguages.length >= 3) {
			alert("You can't add more than 3 languages.");
		} else {
			selectedLanguages.push(key);
			this.setState({selectedLanguages: selectedLanguages});
		}
	}

	render() {
		
		if (this.state.allDataLoaded) {
			var languagesComponent = 
					<Languages 
						allLanguages={this.state.allLanguages}
						selectedLanguages={this.state.selectedLanguages} 
						addToSelectedLanguages={this.addToSelectedLanguages}
					/>;

			var categoriesComponent = 
					<Categories 
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
					<CreateSnippet />;

			var error404Component = 
					<h1>Page Not Found</h1>;

			var homeComponent = 
					<Home />;

			var loginComponent = 
					<Login />;

			var openExampleCardComponent = 
					<OpenExampleCard />;

			var openSyntaxCardComponent = 
					<OpenSyntaxCard />;

			var searchResultsComponent = 
					<SearchResults />;

			var userSettingsComponent = 
					<UserSettings />;

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

			console.log("ALL DATA LOADED");
			return (
				<div className="page-container">
					<Header />
		
					<div className="container-fluid">
						<section id="languages">
							<div id="react-languages" className="col-md-12">
								{languagesComponent}
							</div>
						</section>

						<section id="content" className="col-md-11 col-md-offset-1">
							{contentComponent}
						</section>
					</div>

					<aside id="categories" className="col-md-2">
						<div id="react-categories">
							{categoriesComponent}
						</div>
					</aside>

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
