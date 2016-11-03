import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './createSnippet.scss';


class CreateSnippet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCategory: '',
			selectedLanguage: '',
			selectedLevel: '',
			enteredDescription: '',
			enteredCode: '',
			object: {}
		}

		this.constructObject = this.constructObject.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.categoryOption = this.categoryOption.bind(this);
		this.languageOption = this.languageOption.bind(this);
	}

	saveExample(object) {
		this.props.addExample(object, this.props.newId);
		browserHistory.push('/');
	}

	constructObject() {
		var object = {
			
		}

		this.setState({object: object});

		this.saveExample();
	}

	onSubmit(event) {
		event.preventDefault();
		var selectedCategory = this.refs.selectCategory.value;
		var selectedLanguage = this.refs.selectLanguage.value;
		var selectedLevel = this.refs.selectLevel.value;
		var enteredDescription = this.refs.enterDescription.value;
		var enteredCode = this.refs.enterCode.value;

		var object = {
			"id": this.props.newId,
			"categoryID": selectedCategory,
			"language": selectedLanguage,
			"createdBy": this.props.user.id,
			"editedBy": this.props.user.id,
			"commentIDs": [],
			"dateCreated": "January 1 2016",
			"dateEdited": "January 1 2016",
			"syntax": false,
			"howTo": false,
			"description": enteredDescription,
			"codeText": enteredCode,
			"embeddedCode": "",
			"image": "",
			"level": selectedLevel,
			"ranking": "1000"
		}

		this.setState({
			selectedCategory: selectedCategory,
			selectedLanguage: selectedLanguage,
			selectedLevel: selectedLevel,
			enteredDescription: enteredDescription,
			enteredCode: enteredCode,
			object: {object}
		});

		// this.constructObject();

		this.saveExample(object);
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
		return (
			<div className='createSnippet-container'>
				<h1>Create Snippet</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<label htmlFor="selectCategory">Select Category:</label>
						<select name="selectCategory" id="selectCategory" ref="selectCategory">
							{this.props.allCategories.map(this.categoryOption)}
						</select>
					</div>
					<div>
						<label htmlFor="selectLanguage">Select Language:</label>
						<select name="selectLanguage" id="selectLanguage" ref="selectLanguage">
							{this.props.allLanguages.map(this.languageOption)}
						</select>
					</div>
					<div>
						<label htmlFor="selectLevel">Select Level:</label>
						<select name="selectLevel" id="selectLevel" ref="selectLevel">
							<option value="Beginner">Beginner</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Advanced">Advanced</option>
						</select>
					</div>
					<div>
						<label htmlFor="enterDescription">Description:</label>
						<textarea name="enterDescription" id="enterDescription" cols="30" rows="10" ref="enterDescription"></textarea>
					</div>
					<div>
						<label htmlFor="enterCode">Code Snippet:</label>
						<textarea name="enterCode" id="enterCode" cols="30" rows="10" ref="enterCode"></textarea>
					</div>
					
					<button type="submit" id="submit">Submit Snippet</button>
				</form>
			</div>
		);
	}
}

/*
<div>
	<label htmlFor="enterEmbedded">or embed a code snippet</label>
	<input type="text" name="enterEmbedded" id="enterEmbedded" ref="enterEmbedded" />
</div>
<div>
	<label htmlFor="enterImage">Screenshot: <span>(Optional)</span></label>
	<input type="file" name="enterImage" id="enterImage" ref="enterImage" />
</div>
*/

CreateSnippet.propTypes = {
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	newId: PropTypes.number,
	user: PropTypes.object,
	addExample: PropTypes.func
};

// CreateSnippet.defaultProps = {

// };

export default CreateSnippet;
