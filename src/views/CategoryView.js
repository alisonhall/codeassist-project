import React, { Component, PropTypes } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery';
import jqueryui from 'jquery-ui';

// Components
import Header from './../components/Header/Header.js';
import Footer from './../components/Footer/Footer.js';
import Categories from './../components/Categories/Categories.js';
import Languages from './../components/Languages/Languages.js';
import Examples from './../components/Examples/Examples.js';


class CategoryView extends Component {
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
			allComments: []
		};
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

	render() {
		if (this.state.allDataLoaded) {
			console.log("ALL DATA LOADED");
			return (
				<div className="page-container">
					<Header />
		
					<div className="container-fluid">
						<section id="languages">
							<div id="react-languages" className="col-md-12">
								<Languages 
									allLanguages={this.state.allLanguages} 
								/>
							</div>
						</section>

						<section id="content" className="col-md-11 col-md-offset-1">
							<h2>Examples</h2>
							<div id="react-examples">
								<Examples 
									allCategories={this.state.allCategories} 
									allExamples={this.state.allExamples} 
									allLanguages={this.state.allLanguages} 
									allUsers={this.state.allUsers} 
									allComments={this.state.allComments} 
									allDataLoaded={this.state.allDataLoaded} 
									params={this.props.params}
								/>
							</div>
						</section>
					</div>

					<aside id="categories" className="col-md-2">
						<div id="react-categories">
							<Categories 
								allCategories={this.state.allCategories} 
								topCategories={this.state.topCategories} 
								allDataLoaded={this.state.allDataLoaded} 
							/>
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

// CategoryView.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// CategoryView.defaultProps = {
// 	allDataLoaded: false
// };

export default CategoryView;
