import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';

// Styles
import './openExampleCard.scss';

class OpenExampleCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			dataLoaded: false,
			isActive: '',

			exampleId: '',
			example: '',

			categoryId: '',
			languageId: '',
			language: '',
			description: '',
			createdBy: '',
			editedBy: '',
			level: '',
			rank: '',
			exampleType: '',
			codeText: '',
			dateEdited: '',
			dateCreated: '',
			embeddedCode: '',
			image: '',
			commentIDs: '',

			newExampleDescription: '',
			newLevel: '',
			newParentCategory: '',
			newLanguageId: '',
			newEditedBy: '',
			newExampleType: '',
			newCodeText: ''
		}

		this.loadSpecificData = this.loadSpecificData.bind(this);
		this.displayComment = this.displayComment.bind(this);
		this.checkForComments = this.checkForComments.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onRestore = this.onRestore.bind(this);
		this.categoryOption = this.categoryOption.bind(this);
		this.languageOption = this.languageOption.bind(this);
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
			var language = this.props.allLanguages[example.language];
			var createdBy = this.props.allUsers[example.createdBy];
			var editedBy = this.props.allUsers[example.editedBy];

			var exampleType;
			if(example.syntax && !example.howTo) {
				exampleType = 'syntax';
			} else if(!example.syntax && !example.howTo) {
				exampleType = 'example';
			} else {
				exampleType = 'howTo';
			}

			// console.log("loadSpecificData exampleType", exampleType);

			var isActive = example.isActive;
			var languageId = example.language;
			var description = example.description;
			var level = example.level;
			var rank = example.ranking;
			var codeText = example.codeText;
			var dateEdited = example.dateEdited;
			var dateCreated = example.dateCreated;
			var embeddedCode = example.embeddedCode;
			var image = example.image;
			var commentIDs = example.commentIDs;

			if ((typeof categoryId !== 'undefined') && 
				(typeof language !== 'undefined') && 
				(typeof createdBy !== 'undefined') && 
				(typeof editedBy !== 'undefined')) {
				var results = [
						categoryId, 
						language, 
						createdBy, 
						editedBy,
						exampleType,
						description,
						level,
						rank,
						codeText,
						dateEdited,
						dateCreated,
						embeddedCode,
						image,
						commentIDs,
						languageId,
						isActive
					];
				resolve(results);
			} else {
				console.log(exampleId, example, categoryId, language, createdBy, editedBy);
				reject(Error("Promise rejected"));
			}
		});

		promise.then(result => {
			this.setState({
				categoryId: result[0],
				language: result[1],
				createdBy: result[2],
				editedBy: result[3],
				exampleType: result[4],
				description: result[5],
				level: result[6],
				rank: result[7],
				codeText: result[8],
				dateEdited: result[9],
				dateCreated: result[10],
				embeddedCode: result[11],
				image: result[12],
				commentIDs: result[13],
				languageId: result[14],
				isActive: result[15],
				dataLoaded: true
			});
		}, function(error) {
			console.log("PROMISE 2 ERROR: " + error);
			this.setState({
				categoryId: null,
				language: null,
				createdBy: null,
				editedBy: null,
				exampleType: null,
				description: null,
				level: null,
				rank: null,
				codeText: null,
				dateEdited: null,
				dateCreated: null,
				embeddedCode: null,
				image: null,
				commentIDs: null,
				languageId: null,
				isActive: null,
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
		if(comments !== 'None') {
			return (
				comments.map(this.displayComment)
			);
		}
	}

	toggleEditMode() {
		if(this.state.isEditing) {
			this.setState({
				isEditing: false
			});

		} else {
			this.setState({
				isEditing: true,
				newExampleDescription: this.state.description,
				newLevel: this.state.level,
				newParentCategory: this.state.categoryId,
				newLanguageId: this.state.languageId,
				newEditedBy: this.state.editedBy,
				newExampleType: this.state.exampleType,
				newCodeText: this.state.codeText
			});
		}
	}

	handleChange(event) {
		var value;
		value = event.target.value;

		this.setState({[event.target.name]: value});
	}

	onSave(event) {
		event.preventDefault();
		var timestamp = moment().format();

		var newParentCategory = this.state.newParentCategory;
		var newExampleDescription = this.state.newExampleDescription;
		var newEditedBy = this.props.allUsers[this.props.currentUserId[0]];
		var newLevel = this.state.newLevel;
		var newLanguageId = this.state.newLanguageId;
		var newDateEdited = timestamp;
		var newExampleType = this.state.newExampleType;
		var newCodeText = this.state.newCodeText;
		var syntax;
		var howTo;
		var oldExampleType;
		var formattedNewExampleType;

		if(this.props.allExamples[this.state.exampleId].syntax && !this.props.allExamples[this.state.exampleId].howTo) {
			oldExampleType = 'syntaxes';
		} else if (!this.props.allExamples[this.state.exampleId].syntax && !this.props.allExamples[this.state.exampleId].howTo) {
			oldExampleType = 'examples';
		} else {
			oldExampleType = 'howTos';
		}

		if(newExampleType == 'syntax') {
			syntax = true;
			howTo = false;
			formattedNewExampleType = 'syntaxes';
		} else if(newExampleType == 'example') {
			syntax = false;
			howTo = false;
			formattedNewExampleType = 'examples';
		} else {
			syntax = false;
			howTo = true;
			formattedNewExampleType = 'howTos';
		}

		// console.log("onSave this.state.exampleType:", this.state.exampleType, " this.state.newExampleType:", this.state.newExampleType, " oldExampleType:", oldExampleType, " formattedNewExampleType:", formattedNewExampleType);

		var object = {
			"id": this.state.exampleId,
			"categoryID": newParentCategory,
			"language": newLanguageId,
			"createdBy": this.state.createdBy.id,
			"editedBy": this.props.currentUserId[0],
			"commentIDs": this.state.commentIDs,
			"dateCreated": this.state.dateCreated,
			"dateEdited": timestamp,
			"syntax": syntax,
			"howTo": howTo,
			"description": newExampleDescription,
			"codeText": newCodeText,
			"embeddedCode": this.state.embeddedCode,
			"image": this.state.image,
			"level": newLevel,
			"ranking": this.state.rank,
			"isActive": true
		}

		this.setState({
			object: {object},
			example: { ...object },
			categoryId: newParentCategory,
			languageId: newLanguageId,
			description: newExampleDescription,
			editedBy: newEditedBy,
			level: newLevel,
			exampleType: newExampleType,
			codeText: newCodeText,
			dateEdited: newDateEdited
		});

		this.toggleEditMode();

		this.props.editExample(object, this.state.exampleId, oldExampleType, formattedNewExampleType, this.props.allExamples[this.state.exampleId].categoryID, newParentCategory, this.props.allExamples[this.state.exampleId].language, newLanguageId);
	}

	onDelete() {
		this.setState({ isActive: false });
		this.props.deleteExample(this.state.exampleId);
		browserHistory.push('/category/' + this.state.categoryId);
	}

	onRestore() {
		this.setState({ isActive: true });
		this.props.restoreExample(this.state.exampleId);
	}

	categoryOption(category, i) {
		return (
			<option key={i} value={category.id}>{category.name}</option>
		);
	}

	languageOption(language, i) {
		return (
			<option key={i} value={language.id}>{language.fullName}</option>
		);
	}

	render() {
		var exampleId = this.state.exampleId;

		if(this.props.allDataLoaded && exampleId && this.props.allCategories && this.props.allLanguages && this.props.allUsers) {

			var example = this.state.example;
			var categoryId = this.state.categoryId;
			var category = this.props.allCategories[this.state.categoryId];
			var language = this.props.allLanguages[this.state.languageId];
			var createdBy = this.state.createdBy;
			var editedBy = this.state.editedBy;
			var exampleType = this.state.exampleType;

			var categoryName = (category) ? category.name : '';
			var languageFull = (language) ? language.fullName : '';
			var languageShort = (language) ? language.name : '';
			var description = this.state.description;
			var level = this.state.level;
			var ranking = this.state.rank;
			var createdByUsername = createdBy.username;
			var dateCreated = this.state.dateCreated;
			var editedByUsername = editedBy.username;
			var dateEdited = this.state.dateEdited;
			var codeText = this.state.codeText;
			var comments = example.commentIDs;
			var numberOfComments = (example.commentIDs == 'None') ? 0 : example.commentIDs.length;
			var languageClass = "language-" + languageShort;

			var deleteButton = (example.isActive) ? <button className="deleteButton" onClick={this.onDelete}><i className="fa fa-trash-o" aria-hidden="true"></i>Delete Example</button> : <button className="deleteButton" onClick={this.onRestore}><i className="fa fa-undo" aria-hidden="true"></i>Restore Example</button>
			var isActiveStatus = (this.state.isActive) ? 'exampleActive' : 'exampleInactive';

			var languagePosition = null;
			if(this.state.languageId == this.props.selectedLanguages[0]) {
				languagePosition = 1;
			} else if(this.state.languageId == this.props.selectedLanguages[1]) {
				languagePosition = 2;
			} else if(this.state.languageId == this.props.selectedLanguages[2]) {
				languagePosition = 3;
			}

			if(this.state.isEditing) {
				return (
					<section className={classnames('openExampleCard-container', `${isActiveStatus}`)}>

						<form onSubmit={this.onSave}>
							<div>
								<label htmlFor="newExampleType">Select Type:</label>
								<span><input type="radio" name="newExampleType" value="syntax" ref="selectTypeSyntax" onChange={this.handleChange} defaultChecked={(exampleType == 'syntax') ? true : false} /><span>Syntax</span></span>
								<span><input type="radio" name="newExampleType" value="example" ref="selectTypeExample" onChange={this.handleChange} defaultChecked={(exampleType == 'example') ? true : false} /><span>Example</span></span>
								<span><input type="radio" name="newExampleType" value="howTo" ref="selectTypeHowTo" onChange={this.handleChange} defaultChecked={(exampleType == 'howTo') ? true : false} disabled /><span>How-To</span></span>
							</div>

							<div>
								<label htmlFor="newParentCategory">Select Parent Category:</label>
								<select name="newParentCategory" id="selectParentCategory" ref="selectParentCategory" value={this.state.newParentCategory} onChange={this.handleChange}>
									<option key={-1} value="None">None</option>
									{this.props.allCategories.map(this.categoryOption)}
								</select>
							</div>

							<div>
								<label htmlFor="newLanguageId">Select Language:</label>
								<select name="newLanguageId" id="selectLanguage" ref="selectLanguage" value={this.state.newLanguageId} onChange={this.handleChange}>
									{this.props.allLanguages.map(this.languageOption)}
								</select>
							</div>
							
							<div>
								<label htmlFor="newLevel">Select Level:</label>
								<select name="newLevel" id="selectLevel" ref="selectLevel" value={this.state.newLevel} onChange={this.handleChange}>
									<option value="Beginner">Beginner</option>
									<option value="Intermediate">Intermediate</option>
									<option value="Advanced">Advanced</option>
								</select>
							</div>

							<div>
								<label htmlFor="newExampleDescription">Description:</label>
								<textarea name="newExampleDescription" id="enterDescription" cols="30" rows="5" ref="enterDescription" value={this.state.newExampleDescription} onChange={this.handleChange} />
							</div>

							<div>
								<label htmlFor="newCodeText">Code Snippet:</label>
								<textarea name="newCodeText" id="enterCode" cols="30" rows="10" ref="enterCode" value={this.state.newCodeText} onChange={this.handleChange} />
							</div>
							
							<button className="submitButton" type="submit" id="submit"><i className="fa fa-floppy-o" aria-hidden="true"></i>Save Example</button>
						</form>

						<button className="cancelButton" onClick={this.toggleEditMode}><i className="fa fa-ban" aria-hidden="true"></i>Cancel</button>
					</section>
				);
			} else {
				return (
					<section className={classnames('openExampleCard-container', `${isActiveStatus}`)}>
						<h2>Example of <Link to={'/category/' + categoryId}>{categoryName}</Link></h2>
						<div className="row">
							<div className="thirds">
								<p>
									{exampleType !== 'syntax' ? (
										<span>Rank {ranking}<br /></span>
									) : 
										null
									}
									{dateCreated}<br />
									Level: {level}
								</p>
							</div>

							<div className="thirds">
								<p>Created By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + createdByUsername}>{createdByUsername}</Link>
								<br />Edited By: <i className="fa fa-user" aria-hidden="true"></i> <Link to={'/user/' + editedByUsername}>{editedByUsername}</Link></p>
							</div>

							<div className="thirds">
								<div className={classnames('languageStyle', `languageStyle${languagePosition}`)}>{languageFull}</div>
							</div>
						</div>

						<button className="editButton" onClick={this.toggleEditMode}><i className="fa fa-pencil" aria-hidden="true"></i>Edit Example</button>
						{deleteButton}

						<h3>Description:</h3>
						<p className="desc">{description}</p>

						<pre><code className={languageClass}>{codeText}</code></pre>

						{exampleType !== 'syntax' ? (
							<div className="comments">
								<p className="commentNum">{numberOfComments} comments</p>
								{this.checkForComments(comments)}
							</div>
						) : 
							null
						}
						
					</section>
				);
			}

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
	allDataLoaded: PropTypes.bool,
	currentUserId: PropTypes.array,
	editExample: PropTypes.func,
	deleteExample: PropTypes.func,
	restoreExample: PropTypes.func
};

// OpenExampleCard.defaultProps = {

// };

export default OpenExampleCard;
