import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './openExampleCard.scss';

class OpenExampleCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataLoaded: false,
			exampleId: '',
			categoryId: '',
			example: '',
			category: '',
			language: '',
			createdBy: '',
			editedBy: ''
		}

		this.loadSpecificData = this.loadSpecificData.bind(this);
		this.displayComment = this.displayComment.bind(this);
		this.checkForComments = this.checkForComments.bind(this);
	}

	componentWillMount() {
		var promise = new Promise((resolve, reject) => {
			var exampleId = this.props.params.exampleId;
			var example = this.props.allExamples[exampleId];

			if ((typeof exampleId !== 'undefined') && (typeof example !== 'undefined')) {
				var results = [exampleId, example];
				resolve(results);
			} else {
				console.log(exampleId, example);
				reject(Error("Promise rejected"));
			}
		});

		promise.then(result => {
			this.setState({
				exampleId: result[0],
				example: result[1]
			}, this.loadSpecificData(result[0], result[1]));
		}, function(error) {
			console.log("PROMISE 1 ERROR: " + error);
			this.setState({
				exampleId: null,
				example: null
			})
		}.bind(this));
	}

	loadSpecificData(exampleId, example) {
		var promise = new Promise((resolve, reject) => {
			var categoryId = example.categoryID;
			var category = this.props.allCategories[example.categoryID];
			var language = this.props.allLanguages[example.language];
			var createdBy = this.props.allUsers[example.createdBy];
			var editedBy = this.props.allUsers[example.editedBy];

			if ((typeof categoryId !== 'undefined') && 
				(typeof category !== 'undefined') && 
				(typeof language !== 'undefined') && 
				(typeof createdBy !== 'undefined') && 
				(typeof editedBy !== 'undefined')) {
				var results = [categoryId, category, language, createdBy, editedBy];
				resolve(results);
			} else {
				console.log(exampleId, example, categoryId, category, language, createdBy, editedBy);
				reject(Error("Promise rejected"));
			}
		});

		promise.then(result => {
			this.setState({
				categoryId: result[0],
				category: result[1],
				language: result[2],
				createdBy: result[3],
				editedBy: result[4],
				dataLoaded: true
			});
		}, function(error) {
			console.log("PROMISE 2 ERROR: " + error);
			this.setState({
				categoryId: null,
				category: null,
				language: null,
				createdBy: null,
				editedBy: null,
				dataLoaded: false
			})
		}.bind(this));
	}

	componentDidUpdate() {
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

	checkForComments(comments) {
		if(comments !== null) {
			return (
				comments.map(this.displayComment)
			);
		}
	}

	render() {
		var exampleId = this.state.exampleId;
		var example = this.state.example;

		if(this.props.allDataLoaded && example && exampleId && this.props.allCategories && this.props.allLanguages && this.props.allUsers) {

			var categoryId = this.state.categoryId;
			var category = this.state.category;
			var language = this.state.language;
			var createdBy = this.state.createdBy;
			var editedBy = this.state.editedBy;

			var categoryName = category.name;
			var languageFull = language.fullName;
			var languageShort = language.name;
			var description = example.description;
			var level = example.level;
			var ranking = example.ranking;
			var createdByUsername = createdBy.username;
			var dateCreated = example.dateCreated;
			var editedByUsername = editedBy.username;
			var dateEdited = example.dateEdited;
			var codeText = example.codeText;
			var comments = (example.commentIDs) ? example.commentIDs : null;
			var numberOfComments = (example.commentIDs) ? example.commentIDs.length : 0;
			var languageClass = "language-" + languageShort;

			var languagePosition = null;
			if(language.id == selectedLanguages[0]) {
				languagePosition = 1;
			} else if(language.id == selectedLanguages[1]) {
				languagePosition = 2;
			} else if(language.id == selectedLanguages[2]) {
				languagePosition = 3;
			}

			var languagePositionStr = (languagePosition) ? 'languageStyle' + languagePosition : '';

			return (
				<section className="openExampleCard-container">
					<h2>Example of <Link to={'/category/' + categoryId}>{categoryName}</Link></h2>
					<div className="row">
						<div className="thirds">
							<p>Rank {ranking}
							<br />{dateCreated}
							<br />Level: {level}</p>
						</div>

						<div className="thirds">
							<p>Created By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + createdByUsername}>{createdByUsername}</Link>
							<br />Edited By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + editedByUsername}>{editedByUsername}</Link></p>
						</div>

						<div className="thirds">
							<div className="languageStyle">{languageFull}</div>
						</div>
					</div>

					<h3>Description:</h3>
					<p className="desc">{description}</p>

					<pre><code className={languageClass}>{codeText}</code></pre>

					<p className="commentNum">{numberOfComments} comments</p>

					<div className="comments">
						{this.checkForComments(comments)}
					</div>
				</section>
			);
		} else {
			return (
				<section className="openExampleCard-container">
					Data Loading...
				</section>
			);
		}
		
	}
}

OpenExampleCard.propTypes = {
	allExamples: PropTypes.array,
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	allUsers: PropTypes.array,
	allComments: PropTypes.array,
	allDataLoaded: PropTypes.bool,
	params: PropTypes.object,
	selectedLanguages: PropTypes.array,
	allDataLoaded: PropTypes.bool
};

// OpenExampleCard.defaultProps = {

// };

export default OpenExampleCard;
