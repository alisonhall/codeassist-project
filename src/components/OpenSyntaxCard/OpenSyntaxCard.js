import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './openSyntaxCard.scss';

class OpenSyntaxCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			syntaxId: this.props.params.syntaxId,
			example: '',
			category: '',
			language: '',
			createdBy: '',
			editedBy: ''
		}

		this.state.example = this.props.allExamples[this.state.syntaxId];
		this.state.category = this.props.allCategories[this.state.example.categoryID];
		this.state.language = this.props.allLanguages[this.state.example.language];
		this.state.createdBy = this.props.allUsers[this.state.example.createdBy];
		this.state.editedBy = this.props.allUsers[this.state.example.editedBy];

		this.displayComment = this.displayComment.bind(this);
	}

	componentDidMount() {
		Prism.highlightAll();
	}

	displayComment(id, i) {

		var comment = this.props.allComments[id];
		var date = comment.dateCreated;
		var username = this.props.allUsers[comment.createdBy].username;
		var text = comment.commentText;

		return(
			<div key={i} className={classnames('comment', `comment-${id}`)}>
				<p>Date: {date}</p>
				<p>User: <Link to={'/user/' + username}>{username}</Link></p>
				<p>{text}</p>
			</div>
		);
	}

	render() {
		var category = this.state.category.name;
		var languageFull = this.state.language.fullName;
		var language = this.state.language.name;
		var description = this.state.example.description;
		var level = this.state.example.level;
		var ranking = this.state.example.ranking;
		var createdBy = this.state.createdBy.username;
		var dateCreated = this.state.example.dateCreated;
		var editedBy = this.state.editedBy.username;
		var dateEdited = this.state.example.dateEdited;
		var codeText = this.state.example.codeText;
		var comments = this.state.example.commentIDs;
		var numberOfComments = this.state.example.commentIDs.length;
		var languageClass = "language-" + language;

		return (
			<section className="openSyntaxCard-container">
				<div className="row">
					<div className="thirds">
						<p>Rank {ranking}
						<br />{dateCreated}
						<br />Level: {level}</p>
					</div>

					<div className="thirds">
						<p>Created By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + createdBy}>{createdBy}</Link>
						<br />Edited By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + editedBy}>{editedBy}</Link></p>
					</div>

					<div className="thirds">
						<div className="languageStyle">{languageFull}</div>
						<p>Category: {category}</p>
					</div>
				</div>

				<h3>Description:</h3>
				<p className="desc">{description}</p>

				<pre><code className={languageClass}>{codeText}</code></pre>

				<p className="commentNum">{numberOfComments} comments</p>

				<div className="comments">
					{comments.map(this.displayComment)}
				</div>
			</section>

		);
	}
}

OpenSyntaxCard.propTypes = {
	allExamples: PropTypes.array,
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	allUsers: PropTypes.array,
	allComments: PropTypes.array,
	allDataLoaded: PropTypes.bool,
	params: PropTypes.object,
	selectedLanguages: PropTypes.array
};

// OpenSyntaxCard.defaultProps = {

// };

export default OpenSyntaxCard;
