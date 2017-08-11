import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';

// Components
import EmptyCard from './../EmptyCard/EmptyCard';
import ExampleCards from './../ExampleCards/ExampleCards';
import NoContent from './../NoContent/NoContent';
import NoLanguage from './../NoLanguage/NoLanguage';
import CategoryInfo from './../CategoryInfo/CategoryInfo';

// Styles
import './examples.scss';


class Examples extends Component {
	constructor(props) {
		super(props);

		this.eachExample = this.eachExample.bind(this);
		this.renderExamples = this.renderExamples.bind(this);
		this.renderEmptyCard = this.renderEmptyCard.bind(this);
		this.displayCategoryInfo = this.displayCategoryInfo.bind(this);
		this.checkIfActive = this.checkIfActive.bind(this);
	}

	eachExample(exampleId, i) {
		console.log("eachExample", exampleId, i);
		var example = this.props.allExamples[exampleId];
		var language = this.props.allLanguages[example.language];
		var category = this.props.allCategories[example.categoryID];
		var editedBy = this.props.allUsers[example.editedBy];
		var createdBy = this.props.allUsers[example.createdBy];
		var isSyntax = example.syntax;
		var isActive = this.props.allExamples[exampleId].isActive;
		var column;

		for (var i = 0; i < this.props.selectedLanguages.length; i++) {
			if (this.props.selectedLanguages[i] == language.id) {
				column = i + 1;
			}
		}

		if(isActive) {
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
	}

	renderEmptyCard(type, language, i) {
		return (
			<section className={classnames('example', `language${language}`)} key={i}>
				<EmptyCard
					key={i}
					languageName={this.props.allLanguages[language].fullName}
					type={type}
				/>
			</section>
		);
	}

	renderExamples(type, language, i) {
		console.log("renderExamples", type, language, i);
		var thisCategory = this.props.allCategories[this.props.thisCategoryId];
		console.log("thisCategory", thisCategory);

		if (thisCategory.count) {
			if (thisCategory.count[language]) {
				if(thisCategory.count[language][type]) {
					// console.log(thisCategory.count[language][type]);
					return (
						<section className={classnames('example', `language${language}`)} key={i}>
							{thisCategory.count[language][type].map(this.eachExample)}
						</section>
					);
				} else {
					return (
						this.renderEmptyCard(type, language, i)
					);
				}
			} else {
				return (
					this.renderEmptyCard(type, language, i)
				);
			}
		} else {
			return (
				this.renderEmptyCard(type, language, i)
			);
		}
	}

	displayCategoryInfo() {
		console.log("displayCategoryInfo", this);
		return(
			<CategoryInfo 
				allCategories = { this.props.allCategories }
				topCategories = { this.props.topCategories }
				allUsers = { this.props.allUsers }
				allDataLoaded = { this.props.allDataLoaded }
				currentUserId = { this.props.currentUserId }
				editCategory = { this.props.editCategory }
				deleteCategory = { this.props.deleteCategory }
				thisCategoryId = { this.props.thisCategoryId }
			/>
		);
	}

	checkIfActive(array) {
		// console.log("checkIfActive ", array);
		var isActive = false;
		for (var i = 0; i < array.length; i++) {
			if(this.props.allExamples[array[i]]) {
				if(this.props.allExamples[array[i]].isActive) {
					isActive = true;
					return isActive;
				}
			}
		}
		return isActive;
	}

	render() {
		if (this.props.allDataLoaded && (this.props.allCategories[this.props.thisCategoryId])) {
			var thisCategory = (this.props.allCategories[this.props.thisCategoryId]) ? this.props.allCategories[this.props.thisCategoryId] : null;
			// console.log(thisCategory);

			var languages = this.props.selectedLanguages;
			var numLanguageClass = 'numLanguages-' + languages.length;

			if ((languages.length > 0) && (thisCategory !== null)) {

				var hasExamples = false;
				var hasSyntaxes = false;
				if (thisCategory) {
					for (var i = 0; i < languages.length; i++) {
						// console.log(thisCategory);
						if(thisCategory.count && thisCategory.count[languages[i]]) {
							// console.log(i);
							// console.log(thisCategory);
							// console.log(thisCategory.count[languages[i]]);
							// console.log(thisCategory.count[languages[i]].examples);
							var examplesLength = (thisCategory.count[languages[i]] && thisCategory.count[languages[i]].examples) ? thisCategory.count[languages[i]].examples.length : 0;
							var syntaxesLength = (thisCategory.count[languages[i]] && thisCategory.count[languages[i]].syntaxes) ? thisCategory.count[languages[i]].syntaxes.length : 0;
							if (examplesLength > 0) {
								// hasExamples = true;
								hasExamples = this.checkIfActive(thisCategory.count[languages[i]].examples);
							}
							if (syntaxesLength > 0) {
								// hasSyntaxes = true;
								hasSyntaxes = this.checkIfActive(thisCategory.count[languages[i]].syntaxes);
							}
						}
					}
				}

				return (
					<div className='examples-container'>
						{this.displayCategoryInfo()}

						<h4>Syntaxes</h4>
						<div className={classnames('syntaxes', numLanguageClass)}>
							{languages.map(this.renderExamples.bind(this, 'syntaxes'))}
						</div>

						<h4>Examples</h4>
						<div className={classnames('examples', numLanguageClass)}>
							{languages.map(this.renderExamples.bind(this, 'examples'))}
						</div>
					</div>
				);

			} else {
				return (
					<div className='examples-container'>
						{this.displayCategoryInfo()}
						<NoLanguage />
					</div>
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

Examples.propTypes = {
	allExamples: PropTypes.array,
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	allUsers: PropTypes.array,
	allComments: PropTypes.array,
	allDataLoaded: PropTypes.bool,
	topCategories: PropTypes.array,
	selectedLanguages: PropTypes.array,
	currentUserId: PropTypes.array,
	editCategory: PropTypes.func,
	deleteCategory: PropTypes.func,
	thisCategoryId: PropTypes.number
};

// Examples.defaultProps = {

// };

export default Examples;
