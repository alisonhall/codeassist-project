import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Components
import ExampleCards from './../ExampleCards/ExampleCards.js';
import SyntaxCards from './../SyntaxCards/SyntaxCards.js';
import NoContent from './../NoContent/NoContent.js';
import NoLanguage from './../NoLanguage/NoLanguage.js';

// Styles
import './examples.scss';


class Examples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryIds: [this.props.allCategories[this.props.params.categoryId].count]
		};
		this.eachExample = this.eachExample.bind(this);
		this.eachSyntax = this.eachSyntax.bind(this);
	}

	eachExample(exampleId, i) {
		var example = this.props.allExamples[exampleId];
		var language = this.props.allLanguages[example.language];
		var category = this.props.allCategories[example.categoryID];
		var editedBy = this.props.allUsers[example.editedBy];
		var createdBy = this.props.allUsers[example.createdBy];
		var isSyntax = example.syntax;
		var column;

		for (var i = 0; i < this.props.selectedLanguages.length; i++) {
			if (this.props.selectedLanguages[i] == language.id) {
				column = i + 1;
			}
		}

		return (
			<ExampleCards 
				key={exampleId}
				example={example}
				language={language}
				category={category}
				editedBy={editedBy}
				createdBy={createdBy}
				allComments={this.props.allComments}
				column={column}
			></ExampleCards>
		);
	}

	eachSyntax(exampleId, i) {
		var example = this.props.allExamples[exampleId];
		var language = this.props.allLanguages[example.language];
		var category = this.props.allCategories[example.categoryID];
		var editedBy = this.props.allUsers[example.editedBy];
		var createdBy = this.props.allUsers[example.createdBy];
		var isSyntax = example.syntax;
		var column;

		for (var i = 0; i < this.props.selectedLanguages.length; i++) {
			if (this.props.selectedLanguages[i] == language.id) {
				column = i + 1;
			}
		}

		return (
			<SyntaxCards 
				key={exampleId}
				example={example}
				language={language}
				category={category}
				editedBy={editedBy}
				createdBy={createdBy}
				allComments={this.props.allComments}
				column={column}
			></SyntaxCards>
		);
	}

	render() {
		if (this.props.allDataLoaded) {
			var thisCategory = this.props.allCategories[this.props.params.categoryId];
			var categoryTitle = thisCategory.name;
			var categoryDescription = thisCategory.description;
			var languages = this.props.selectedLanguages;
			var numLanguageClass = 'numLanguages-' + languages.length;

			if (languages.length > 0) {

				var hasContent = false;
				for (var i = 0; i < languages.length; i++) {
					if((thisCategory.count[languages[i]].examples.length > 0) || (thisCategory.count[languages[i]].syntaxes.length > 0)) {
						hasContent = true;
					}
				}

				if (hasContent) {
					return (
						<div className='examples-container'>
							<h2>{categoryTitle}</h2>
							<p>{categoryDescription}</p>

							<h4>Syntaxes</h4>
							<div className={classnames('syntaxes', numLanguageClass)}>
								
								{languages.map((language, i) => (
									<section className={classnames('syntax', `language${language}`)} key={i}>
										{thisCategory.count[language].examples.map(this.eachSyntax)}
									</section>
								))}

							</div>

							<h4>Examples</h4>
							<div className={classnames('examples', numLanguageClass)}>
								
								{languages.map((language, i) => (
									<section className={classnames('example', `language${language}`)} key={i}>
										{thisCategory.count[language].syntaxes.map(this.eachExample)}
									</section>
								))}

							</div>
						</div>

					);
				} else {
					return (
						<NoContent />
					);
				}

			} else {
				return (
					<NoLanguage />
				);
			}

		} else {
			return (
				<div className='examples-container'>
					Data Not Loaded...
				</div>
			);
		}
		
	}
}


// {thisCategory.count[thisLanguageId].syntaxes.map(this.eachSyntax)}
// {thisCategory.count[thisLanguageId].examples.map(this.eachExample)}


// const items = this.props.items.map((item) => (
// 	<ul key={item.id}>
// 		<li>
// 			<button onClick={() => this.displayAlert(item.email)}>
// 				{item.lastName + ', ' + item.firstName}
// 			</button>
// 		</li>
// 	</ul>
// ));

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
