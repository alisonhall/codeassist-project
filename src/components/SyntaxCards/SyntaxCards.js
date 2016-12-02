import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';


// Styles
import './syntaxCards.scss';

class SyntaxCards extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		Prism.highlightAll();
	}

	render() {
		// console.log(this.state);
		// console.log(this.props);
		var category = this.props.category.name;
		var languageFull = this.props.language.fullName;
		var language = this.props.language.name;
		var description = this.props.example.description;
		var level = this.props.example.level;
		var ranking = this.props.example.ranking;
		var createdBy = (this.props.createdBy) ? this.props.createdBy.username : '';
		var dateCreated = this.props.example.dateCreated;
		var editedBy = (this.props.editedBy) ? this.props.editedBy.username : '';
		var dateEdited = this.props.example.dateEdited;
		var codeText = this.props.example.codeText;
		var numberOfComments = '';
		if(this.props.example.commentIDs) {
			numberOfComments = (this.props.example.commentIDs == 'None') ? 0 : this.props.example.commentIDs.length;
		}
		var languageClass = "language-" + language;
		var exampleId = this.props.example.id;

		return (
			<section className={classnames('syntaxCards-container', `column-${this.props.column}`)}>
				<div className="row">
					<div className="thirds">
						<p>{/*}Rank {ranking}{*/}
						<br />{dateCreated}
						<br />Level: {level}</p>
					</div>

					<div className="thirds">
						<p>Created By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + createdBy}>{createdBy}</Link>
						{/*}<br />Edited By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + editedBy}>{editedBy}</Link>{*/}</p>
					</div>

					<div className="thirds">
						<div className="languageStyle">{languageFull}</div>
						{/*}<p>Category: {category}</p>{*/}
					</div>
				</div>

				<h3>Description:</h3>
				<p className="desc">{description}</p>

				<pre><code className={languageClass}>{codeText}</code></pre>

				<Link to={'/syntax/' + exampleId}>Expand</Link>
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
	allComments: PropTypes.array,
	column: PropTypes.number
};

// SyntaxCards.defaultProps = {

// };

export default SyntaxCards;
