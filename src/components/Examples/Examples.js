import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Components
import ExampleCards from './../ExampleCards/ExampleCards.js';
import SyntaxCards from './../SyntaxCards/SyntaxCards.js';

// Styles
import './examples.scss';


class Examples extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	allExamples: []
		// };
		this.eachExample = this.eachExample.bind(this);

		// var self = this;
		// $.getJSON('../../test-data.json', function(results){
		// 	$.each(results.examples, function(index, item) {
		// 		self.add(item, index);
		// 	});
		// });
	}

	// add(item, index) {
	// 	var allExamples = this.state.allExamples;
	// 	allExamples[index] = item;
	// 	this.setState({allExamples: allExamples});
	// }

	eachExample(example, i) {
		if(this.props.params.categoryId == example.categoryID) {
			var language = this.props.allLanguages[example.language];
			var category = this.props.allCategories[example.categoryID];
			var editedBy = this.props.allUsers[example.editedBy];
			var createdBy = this.props.allUsers[example.createdBy];
			var isSyntax = example.syntax;

			if (isSyntax) {
				return (
					<SyntaxCards 
						key={i}
						example={example}
						language={language}
						category={category}
						editedBy={editedBy}
						createdBy={createdBy}
						allComments={this.props.allComments}
					></SyntaxCards>
				);
			} else {
				return (
					<ExampleCards 
						key={i}
						example={example}
						language={language}
						category={category}
						editedBy={editedBy}
						createdBy={createdBy}
						allComments={this.props.allComments}
					></ExampleCards>
				);
			}
		}
	}

	render() {
		if (this.props.allDataLoaded) {
			return (
				<div className='examples-container'>
					{this.props.allExamples.map(this.eachExample)}
				</div>

			);
		} else {
			return (
				<div className='examples-container'>
					Data Not Loaded...
				</div>
			);
		}
		
	}
}

Examples.propTypes = {
	allExamples: PropTypes.array,
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	allUsers: PropTypes.array,
	allComments: PropTypes.array,
	allDataLoaded: PropTypes.bool,
	params: PropTypes.object
};

// Examples.defaultProps = {

// };

export default Examples;
