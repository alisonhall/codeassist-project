import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';

// Styles
import './createCategory.scss';


class CreateCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			object: {},
			name: '',
			relatedNames: [],
			parentCategory: 'null',
			relatedCategories: [],
			description: '',
			isTopLevel: true
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.saveCategory = this.saveCategory.bind(this);
		this.categoryOption = this.categoryOption.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	saveCategory(object, selectedParentCategory, isTopLevel) {
		this.props.addCategory(object, this.props.newId, selectedParentCategory, isTopLevel);
		browserHistory.push('/');
	}

	onSubmit(event) {
		event.preventDefault();
		var timestamp = moment().format();

		var object = {
			"id": `${this.props.newId}`,
			"key": `${this.props.newId}`,
			"relatedCategoryIDs": this.state.relatedCategories,
			"isTopLevel": this.state.isTopLevel,
			"name": this.state.name,
			"alternativeNames": this.state.relatedNames,
			"description": this.state.description,
			"createdBy": this.props.user.id,
			"editedBy": this.props.user.id,
			"dateCreated": timestamp,
			"dateEdited": timestamp,
		}

		this.setState({
			object: {object}
		});

		this.saveCategory(object, Number(this.state.parentCategory), this.state.isTopLevel);
	}

	handleChange(event) {
		var value;

		if(event.target.name == 'relatedCategories') {
			var options = event.target.options;
			value = [];
			for (var i = 0, l = options.length; i < l; i++) {
				if (options[i].selected) {
					value.push(options[i].value);
				}
			}
		} else if(event.target.name == 'relatedNames') {
			value = event.target.value.split(',');
			for (var i = 0; i < value.length; i++) {
				value[i] = $.trim(value[i]);
			}
		} else if(event.target.name == 'parentCategory') {
			if(event.target.value == 'null') {
				this.setState({isTopLevel: true});
			} else {
				this.setState({isTopLevel: false});
			}
			value = event.target.value;
		} else {
			value = event.target.value;
		}

		this.setState({[event.target.name]: value});
	}

	categoryOption(category, i) {
		return (
			<option key={i} value={category.id}>{category.name}</option>
		);
	}

	render() {
		return (
			<div className='createCategory-container'>
				<h1>Create Category</h1>
				<form onSubmit={this.onSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input name="name" id="enterName" ref="enterName" value={this.state.name} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="relatedNames">Related/Alternative Names:<span>(Separate names by commas)</span></label>
						<input name="relatedNames" id="enterRelatedNames" ref="enterRelatedNames" value={this.state.relatedNames} onChange={this.handleChange} />
					</div>
					<div>
						<label htmlFor="parentCategory">Select Parent Category:</label>
						<select name="parentCategory" id="selectParentCategory" ref="selectParentCategory" value={this.state.parentCategory} onChange={this.handleChange}>
							<option key={-1} value="null">None</option>
							{this.props.allCategories.map(this.categoryOption)}
						</select>
					</div>
					<div>
						<label htmlFor="relatedCategories">Select Related Categories:<span>(Optional. Multiple selections allowed)</span></label>
						<select name="relatedCategories" id="selectRelatedCategories" ref="selectRelatedCategories" multiple={true} value={this.state.relatedCategories} onChange={this.handleChange}>
							{this.props.allCategories.map(this.categoryOption)}
						</select>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<textarea name="description" id="enterDescription" cols="30" rows="5" ref="enterDescription" value={this.state.description} onChange={this.handleChange} />
					</div>
					
					<button type="submit" id="submit">Submit Category</button>
				</form>
			</div>
		);
	}
}

CreateCategory.propTypes = {
	allCategories: PropTypes.array,
	allLanguages: PropTypes.array,
	topCategories: PropTypes.array,
	newId: PropTypes.number,
	user: PropTypes.object,
	addCategory: PropTypes.func
};

// CreateCategory.defaultProps = {

// };

export default CreateCategory;
