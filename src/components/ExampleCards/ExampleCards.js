import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Styles
import './exampleCards.scss';


class ExampleCards extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var category = this.props.category.name;
		var languageFull = this.props.language.fullName;
		var language = this.props.language.name;
		var description = this.props.example.description;
		var level = this.props.example.level;
		var ranking = this.props.example.ranking;
		var createdBy = this.props.createdBy.username;
		var dateCreated = this.props.example.dateCreated;
		var editedBy = this.props.editedBy.username;
		var dateEdited = this.props.example.dateEdited;
		var codeText = this.props.example.codeText;
		var numberOfComments = this.props.example.commentIDs.length;

		return (
			<section className="example-cards-container">
				<p>Category: {category}</p>
				<p>Language: {languageFull}</p>
				<h3>Description: {description}</h3>
				<p>Level: {level}</p>
				<p>Ranking: {ranking}</p>
				<p>Created By: {createdBy}</p>
				<p>{dateCreated}</p>
				<p>Edited By: {editedBy}</p>
				<p>{dateEdited}</p>
				<pre className={language}><code>{codeText}</code></pre>
				<p>Number of Comments: {numberOfComments}</p>
			</section>

		);
	}
}

ExampleCards.propTypes = {
	example: PropTypes.object,
	language: PropTypes.object,
	category: PropTypes.object,
	editedBy: PropTypes.object,
	createdBy: PropTypes.object,
	allComments: PropTypes.array
};

// Examples.defaultProps = {

// };

export default ExampleCards;
