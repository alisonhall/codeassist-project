import React, { Component, PropTypes } from 'react';
import Categories from './Categories.js';
import Languages from './Languages.js';
import Examples from './Examples.js';
import $ from 'jquery';
import jqueryui from 'jquery-ui';


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
				// console.log(item, index);
				self.add(item, index, 'allCategories');
				this.state.categoryDataLoaded = true;
			}.bind(this));
			$.each(results.languages2, function(el, item) {
				// console.log(item, el);
				self.add(item, el, 'allLanguages');
				this.state.languageDataLoaded = true;
			}.bind(this));
			$.each(results.examples, function(index, item) {
				self.add(item, index, 'allExamples');
				this.state.exampleDataLoaded = true;
			}.bind(this));
			this.state.allDataLoaded = true;
			this.render();
			// this.setState({
			//         allDataLoaded: true
			//       });
		}.bind(this));
	}

	// componentDidUpdate() {
	// 	// this.render();
	// 	// forceUpdate();
	// }

	// componentWillReceiveProps(nextProps) {
	// 	this.setState({
	// 		categoryDataLoaded: nextProps.categoryDataLoaded,
	// 		languageDataLoaded: nextProps.languageDataLoaded,
	// 		exampleDataLoaded: nextProps.exampleDataLoaded,
	// 		allDataLoaded: nextProps.allDataLoaded,
	// 		allCategories: nextProps.allCategories,
	// 		topCategories: nextProps.topCategories,
	// 		allLanguages: nextProps.allCategories,
	// 		selectedLanguages: nextProps.selectedLanguages,
	// 		allExamples: nextProps.allExamples
	// 	});
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
		console.log("Render Start");
		// this.waitForElement();
		// var start = false;
		// while (!start) {
		// 	if (!this.waitForElement()) {
		// 		start = true;
		// this.waitForElement();

		return (
			<div>
				<h1>Under construction. Please come back later.</h1>
				<p>Categories:</p>
				<div id="react-categories">
					<Categories allCategories={this.state.allCategories} topCategories={this.state.topCategories} allDataLoaded={this.state.allDataLoaded} />
				</div>
				<p>Languages:</p>
				<div id="react-languages">
					<Languages allLanguages={this.state.allLanguages} />
				</div>
				<p>Examples:</p>
				<div id="react-examples">
					<Examples allExamples={this.state.allExamples} />
				</div>
			</div>

		);

		console.log(this.state.allDataLoaded);
		if (this.state.allDataLoaded) {
			console.log("ALL DATA LOADED");
			return (
				<div key={this.state.allDataLoaded}>
					ALL DATA LOADED...
				</div>

			);
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
		} else {
			
			return (
				<div key={this.state.allDataLoaded}>
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
