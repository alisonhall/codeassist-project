import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Components
import ExampleCards from './../ExampleCards/ExampleCards.js';
import SyntaxCards from './../SyntaxCards/SyntaxCards.js';
import NoContent from './../NoContent/NoContent.js';

// Styles
import './examples.scss';


class Examples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			examples: [],
			syntaxes: [],
			examplesHTML: '',
			syntaxesHTML: '',
			language1ExampleIds: [],
			language1SyntaxIds: [],
			language2ExampleIds: [],
			language2SyntaxIds: [],
			language3ExampleIds: [],
			language3SyntaxIds: [],
			categoryIds: [this.props.allCategories[this.props.params.categoryId].count]
		};
		this.eachExample = this.eachExample.bind(this);
		this.eachSyntax = this.eachSyntax.bind(this);
		// this.getRelatedExamples = this.getRelatedExamples.bind(this);
		this.getLanguageSyntaxes = this.getLanguageSyntaxes.bind(this);
		this.getLanguageExamples = this.getLanguageExamples.bind(this);
	}

	// componentWillMount() {
	// 	// this.getRelatedExamples();
	// }

	// getRelatedExamples() {
	// 	var relatedExamples = this.props.allCategories[this.props.params.categoryId].count;
	// 	this.setState({categoryIds: relatedExamples});

	// 	var theseSyntaxes = this.props.allExamples.map(this.eachSyntax);
	// 	var theseExamples = this.props.allExamples.map(this.eachExample);

	// 	this.setState({
	// 		syntaxesHTML: theseSyntaxes, 
	// 		examplesHTML: theseExamples
	// 	});

	// }

	eachExample(exampleId, i) {
		// if(this.props.params.categoryId == example.categoryID) {
			var example = this.props.allExamples[exampleId];
			var language = this.props.allLanguages[example.language];
			var category = this.props.allCategories[example.categoryID];
			var editedBy = this.props.allUsers[example.editedBy];
			var createdBy = this.props.allUsers[example.createdBy];
			var isSyntax = example.syntax;

			if (!isSyntax) {
				// var syntaxes = this.state.syntaxes;
				// syntaxes.push(example);
				// this.setState({syntaxes: syntaxes});

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
		// }
	}

	eachSyntax(exampleId, i) {
		// if(this.props.params.categoryId == example.categoryID) {
			var example = this.props.allExamples[exampleId];
			var language = this.props.allLanguages[example.language];
			var category = this.props.allCategories[example.categoryID];
			var editedBy = this.props.allUsers[example.editedBy];
			var createdBy = this.props.allUsers[example.createdBy];
			var isSyntax = example.syntax;

			if (isSyntax) {
				// var examples = this.state.examples;
				// examples.push(example);
				// this.setState({examples: examples});

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
			}
		// }
	}

	getLanguageExamples(thisCategory, language) {
		// this.setState({})

		var language1 = 0;
		var language2 = 5;
		var language3 = 1;

		// var language1 = this.props.selectedLanguages[0];
		// var language2 = this.props.selectedLanguages[1];
		// var language3 = this.props.selectedLanguages[2];

		var examplesLanguage1 = thisCategory.count[language1].examples;
		var syntaxesLanguage1 = thisCategory.count[language1].syntaxes;
		var examplesLanguage2 = thisCategory.count[language2].examples;
		var syntaxesLanguage2 = thisCategory.count[language2].syntaxes;
		var examplesLanguage3 = thisCategory.count[language3].examples;
		var syntaxesLanguage3 = thisCategory.count[language3].syntaxes;
	}

	getLanguageSyntaxes(thisCategory, language) {
		var language1 = 0;
		var language2 = 5;
		var language3 = 1;

		// var language1 = this.props.selectedLanguages[0];
		// var language2 = this.props.selectedLanguages[1];
		// var language3 = this.props.selectedLanguages[2];

		var examplesLanguage1 = thisCategory.count[language1].examples;
		var syntaxesLanguage1 = thisCategory.count[language1].syntaxes;
		var examplesLanguage2 = thisCategory.count[language2].examples;
		var syntaxesLanguage2 = thisCategory.count[language2].syntaxes;
		var examplesLanguage3 = thisCategory.count[language3].examples;
		var syntaxesLanguage3 = thisCategory.count[language3].syntaxes;
	}

	render() {
		if (this.props.allDataLoaded) {
			var thisCategory = this.props.allCategories[this.props.params.categoryId];
			var categoryTitle = thisCategory.name;
			var categoryDescription = thisCategory.description;

			var language1 = 0;
			var language2 = 5;
			var language3 = 1;

			// var language1 = this.props.selectedLanguages[0];
			// var language2 = this.props.selectedLanguages[1];
			// var language3 = this.props.selectedLanguages[2];

			var examplesLanguage1 = thisCategory.count[language1].examples;
			var syntaxesLanguage1 = thisCategory.count[language1].syntaxes;
			var examplesLanguage2 = thisCategory.count[language2].examples;
			var syntaxesLanguage2 = thisCategory.count[language2].syntaxes;
			var examplesLanguage3 = thisCategory.count[language3].examples;
			var syntaxesLanguage3 = thisCategory.count[language3].syntaxes;

			// for (var i = this.props.selectedLanguages.length - 1; i >= 0; i--) {
			// 	getLanguageExamples(thisCategory, this.props.selectedLanguages[i]);
			// 	getSyntaxExamples(thisCategory, this.props.selectedLanguages[i]);
			// 	this.state.examples = thisCategory.
			// }

			return (
				<div className='examples-container'>
					<h2>{categoryTitle}</h2>
					<p>{categoryDescription}</p>

					<h4>Syntaxes</h4>
					<section className="language1">
						{syntaxesLanguage1.map(this.eachSyntax)}
					</section>
					<section className="language2">
						{syntaxesLanguage2.map(this.eachSyntax)}
					</section>
					<section className="language3">
						{syntaxesLanguage3.map(this.eachSyntax)}
					</section>

					<h4>Examples</h4>
					<section className="language1">
						{examplesLanguage1.map(this.eachExample)}
					</section>
					<section className="language2">
						{examplesLanguage2.map(this.eachExample)}
					</section>
					<section className="language3">
						{examplesLanguage3.map(this.eachExample)}
					</section>
				</div>

			);

			// return (
			// 	<div className='examples-container'>
			// 		<h2>{categoryTitle}</h2>
			// 		<p>{categoryDescription}</p>

			// 		<h4>Syntaxes</h4>
			// 		<section className="language1">
			// 			{this.props.allExamples.map(this.eachSyntax)}
			// 		</section>
			// 		<section className="language2">

			// 		</section>
			// 		<section className="language3">

			// 		</section>

			// 		<h4>Examples</h4>
			// 		<section className="language1">
			// 			{this.props.allExamples.map(this.eachExample)}
			// 		</section>
			// 		<section className="language2">

			// 		</section>
			// 		<section className="language3">

			// 		</section>
			// 	</div>

			// );
			// return (
			// 	<div className='examples-container'>
			// 		<h4>Syntaxes</h4>
			// 		{this.state.syntaxesHTML}
			// 		<h4>Examples</h4>
			// 		{this.state.examplesHTML}
			// 	</div>

			// );
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
	params: PropTypes.object,
	selectedLanguages: PropTypes.array
};

// Examples.defaultProps = {

// };

export default Examples;
