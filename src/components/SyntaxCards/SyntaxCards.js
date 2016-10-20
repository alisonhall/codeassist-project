import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
// import hljs from 'highlight.js';
// import {PrismCode} from "react-prism";
// import {PrismCode} from "./../../../node_modules/react-prism/lib";
// import Prism from 'prismjs';


// Styles
import './syntaxCards.scss';

class SyntaxCards extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// hljs.highlightBlock(this.__container);
		Prism.highlightAll();
		// Prism.highlightElement(this.__container, true);
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
		var languageClass = "language-" + language;

		// var html = Prism.highlight(codeText, Prism.languages.swift);
		// var html = Prism.highlight(codeText);

		return (
			<section className="syntaxCards-container">
				<div className="row">
					<div className="thirds">
						<p>Rank {ranking}
						<br />{dateCreated}
						<br />Level: {level}</p>
					</div>

					<div className="thirds">
						<p>Created By: <i className="fa fa-user" aria-hidden="true"></i> <a href="#">{createdBy}</a>
						<br />Edited By: <i className="fa fa-user" aria-hidden="true"></i> <a href="#">{editedBy}</a></p>
					</div>

					<div className="thirds">
						<div className="languageStyle">{languageFull}</div>
						<p>Category: {category}</p>
					</div>
				</div>

				<h3>Description:</h3>
				<p className="desc">{description}</p>

				<pre className={languageClass}><code>{codeText}</code></pre>

				<p className="commentNum">{numberOfComments} comments</p>
			</section>

		);
	}
}

SyntaxCards.propTypes = {
	example: PropTypes.object,
	language: PropTypes.object,
	category: PropTypes.object,
	editedBy: PropTypes.object,
	createdBy: PropTypes.object,
	allComments: PropTypes.array
};

// SyntaxCards.defaultProps = {

// };

export default SyntaxCards;