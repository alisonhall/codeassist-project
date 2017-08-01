import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';

// Styles
import './createSnippet.scss';


class CreateSnippet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			object: {},
			type: 'Example',
			category: '0',
			language: '0',
			level: 'Beginner',
			description: '',
			code: '',
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.saveExample = this.saveExample.bind(this);
		this.categoryOption = this.categoryOption.bind(this);
		this.languageOption = this.languageOption.bind(this);
	}

	saveExample(object, selectedCategory, selectedLanguage, isSyntax) {
		this.props.addExample(object, this.props.newId, selectedCategory, selectedLanguage, isSyntax);
		browserHistory.push('/category/' + selectedCategory);
	}

	onSubmit(event) {
		event.preventDefault();
		var timestamp = moment().format();

		var selectedType = this.state.type;
		var isSyntax = false;
		var isHowTo = false;
		if(selectedType == 'Syntax') {
			isSyntax = true;
			isHowTo = false;
		} else if (selectedType == 'Example') {
			isSyntax = false;
			isHowTo = false;
		} else if (selectedType == 'How-To') {
			isSyntax = false;
			isHowTo = true;
		} else {
			console.log("ERROR: Select Type options");
		}

		var object = {
			"id": this.props.newId,
			"categoryID": this.state.category,
			"language": this.state.language,
			"createdBy": this.props.user.id,
			"editedBy": this.props.user.id,
			"commentIDs": [],
			"dateCreated": timestamp,
			"dateEdited": timestamp,
			"syntax": isSyntax,
			"howTo": isHowTo,
			"description": this.state.description,
			"codeText": this.state.code,
			"embeddedCode": "",
			"image": "",
			"level": this.state.level,
			"ranking": "1000",
			"commentIDs": "None",
			"isActive": true
		}

		this.setState({
			object: {object}
		});

		this.saveExample(object, Number(this.state.category), Number(this.state.language), isSyntax);
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState({[event.target.name]: value});
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
						<label htmlFor="type">Select Type:</label>
						<span><input type="radio" name="type" value="Syntax" ref="selectTypeSyntax" onChange={this.handleChange} /><span>Syntax</span></span>
						<span><input type="radio" name="type" value="Example" ref="selectTypeExample" onChange={this.handleChange} defaultChecked /><span>Example</span></span>
						<span><input type="radio" name="type" value="How-To" ref="selectTypeHowTo" onChange={this.handleChange} disabled /><span>How-To</span></span>
					</div>
					<div>
						<label htmlFor="category">Select Category:</label>
						<select name="category" id="selectCategory" ref="selectCategory" value={this.state.category} onChange={this.handleChange}>
							{this.props.allCategories.map(this.categoryOption)}
						</select>
					</div>
					<div>
						<label htmlFor="language">Select Language:</label>
						<select name="language" id="selectLanguage" ref="selectLanguage" value={this.state.language} onChange={this.handleChange}>
							{this.props.allLanguages.map(this.languageOption)}
						</select>
					</div>
					<div>
						<label htmlFor="level">Select Level:</label>
						<select name="level" id="selectLevel" ref="selectLevel" value={this.state.level} onChange={this.handleChange}>
							<option value="Beginner">Beginner</option>
							<option value="Intermediate">Intermediate</option>
							<option value="Advanced">Advanced</option>
						</select>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<textarea name="description" id="enterDescription" cols="30" rows="5" ref="enterDescription" value={this.state.description} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="code">Code Snippet:</label>
						<textarea name="code" id="enterCode" cols="30" rows="10" ref="enterCode" value={this.state.code} onChange={this.handleChange} />
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
