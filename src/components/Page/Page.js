import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import jqueryui from 'jquery-ui';

// Components
import Categories from './../Categories/Categories.js';
import Languages from './../Languages/Languages.js';
import Examples from './../Examples/Examples.js';

// Styles
import './page.scss';


class Page extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryDataLoaded: false,
			languageDataLoaded: false,
			exampleDataLoaded: false,
			allDataLoaded: false,
			allCategories: [],
			topCategories: [],
			allLanguages: [],
			selectedLanguages: [],
			allExamples: []
		};

		// this.waitForElement = this.waitForElement.bind(this);
	}

	componentWillMount() {
		// this.waitForElement($('.accordion'));

		// $( ".accordion" ).accordion({
		//     collapsible: true
		// });

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
			this.setState({allDataLoaded: true});
			// this.render();
			// this.setState({
			//         allDataLoaded: true
			//       });
		}.bind(this));
	}

	// componentDidUpdate() {
	// 	// this.render();
	// 	// forceUpdate();
	// }

	// waitForElement() {
	//     if(this.state.categoryDataLoaded && this.state.languageDataLoaded && this.state.exampleDataLoaded && this.state.allDataLoaded){
	//     	this.render();
	//     }
	//     else{
	//         setTimeout(function(){
	//             this.waitForElement();
	//         }, 1000);
	//     }
	// }

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

		} else {
			alert("Error: Unknown state");
		}
	}

	render() {
		// console.log("Render Start");
		// this.waitForElement();
		// var start = false;
		// while (!start) {
		// 	if (!this.waitForElement()) {
		// 		start = true;
		// this.waitForElement();

		// return (
		// 	<div>
		// 		<h1>Under construction. Please come back later.</h1>
		// 		<p>Categories:</p>
		// 		<div id="react-categories">
		// 			<Categories allCategories={this.state.allCategories} topCategories={this.state.topCategories} allDataLoaded={this.state.allDataLoaded} />
		// 		</div>
		// 		<p>Languages:</p>
		// 		<div id="react-languages">
		// 			<Languages allLanguages={this.state.allLanguages} />
		// 		</div>
		// 		<p>Examples:</p>
		// 		<div id="react-examples">
		// 			<Examples allExamples={this.state.allExamples} />
		// 		</div>
		// 	</div>

		// );

		// console.log(this.state.allDataLoaded);
		if (this.state.allDataLoaded) {
			console.log("ALL DATA LOADED");
			// return (
			// 	<div key={this.state.allDataLoaded}>
			// 		ALL DATA LOADED...
			// 	</div>

			// );
			return (
				<div className="page">
					<header id="header">
						<div id="logo"><h1>Code Assist</h1></div>
					</header>
					<section id="languages">
						<h2>Languages:</h2>
						<div id="react-languages">
							<Languages allLanguages={this.state.allLanguages} />
						</div>
					</section>
					<aside id="categories">
						<h2>Categories:</h2>
						<div id="react-categories">
							<Categories allCategories={this.state.allCategories} topCategories={this.state.topCategories} allDataLoaded={this.state.allDataLoaded} />
						</div>
					</aside>
					<section id="content">
						<h2>Examples:</h2>
						<div id="react-examples">
							<Examples allExamples={this.state.allExamples} />
						</div>
					</section>
				</div>
			);

		} else {
			
			return (
				<div className="page" key={this.state.allDataLoaded}>
					Loading...
				</div>

			);
		}
				
		// 	}
		// }
	}
}

// <Categories allCategories={this.state.allCategories} topCategories={this.state.topCategories} />
// <Languages allLanguages={this.state.allLanguages} />
// <Examples allExamples={this.state.allExamples} />

// Page.propTypes = {
// 	categoryDataLoaded: PropTypes.bool,
// 	languageDataLoaded: PropTypes.bool,
// 	exampleDataLoaded: PropTypes.bool,
// 	allDataLoaded: PropTypes.bool
// };

// Page.defaultProps = {
// 	allDataLoaded: false
// };

export default Page;