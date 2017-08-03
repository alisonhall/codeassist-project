import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link, browserHistory } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
import $ from 'jquery';

// Styles
import './categoryInfo.scss';


class CategoryInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			categoryId: this.props.thisCategoryId,
			categoryTitle: '',
			categoryDescription: '',
			subCategoryIDs: [],
			categoryAlternativeNames: [],
			relatedCategoryIDs: [],
			isTopLevel: '',
			originalParentCategory: '',
			parentCategory: '',
			categoryCreatedBy: '',
			categoryEditedBy: '',
			dateEdited: '',
			dateCreated: '',
			newCategoryTitle: '',
			newCategoryDescription: '',
			newCategoryAlternativeNames: [],
			newRelatedCategoryIDs: [],
			newIsTopLevel: '',
			newParentCategory: '',
			newCategoryEditedBy: '',
			newDateEdited: '',
			object: {}
		}

		this.renderCategoryInfo = this.renderCategoryInfo.bind(this);
		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.categoryOption = this.categoryOption.bind(this);
		this.categoryNames = this.categoryNames.bind(this);
		this.checkCategoryIds = this.checkCategoryIds.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.splitElements = this.splitElements.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		var thisCategory = (nextProps.allCategories[this.props.thisCategoryId]) ? nextProps.allCategories[this.props.thisCategoryId] : null;

		var categoryTitle = (thisCategory) ? thisCategory.name : 'Loading...';
		var categoryDescription = (thisCategory) ? thisCategory.description : '';
		var categoryAlternativeNames = (thisCategory.alternativeNames == 'None') ? '' : thisCategory.alternativeNames;
		var subCategoryIDs = (thisCategory.subCategoryIDs) ? thisCategory.subCategoryIDs : 'None';
		var relatedCategoryIDs = (thisCategory.relatedCategoryIDs == 'None') ? [] : thisCategory.relatedCategoryIDs;
		var isTopLevel = (thisCategory) ? thisCategory.isTopLevel : null;
		var parentCategory = (thisCategory.parentCategory) ? thisCategory.parentCategory : 'None';
		var categoryCreatedBy = (thisCategory) ? thisCategory.createdBy : '';
		var categoryEditedBy = (thisCategory) ? thisCategory.editedBy : '';
		var dateEdited = (thisCategory) ? thisCategory.dateEdited : '';
		var dateCreated = (thisCategory) ? thisCategory.dateCreated : '';

		this.setState({
			categoryId: this.props.thisCategoryId,
			categoryTitle: categoryTitle,
			categoryDescription: categoryDescription,
			subCategoryIDs: subCategoryIDs,
			categoryAlternativeNames: categoryAlternativeNames,
			relatedCategoryIDs: relatedCategoryIDs,
			isTopLevel: isTopLevel,
			originalParentCategory: parentCategory,
			parentCategory: parentCategory,
			categoryCreatedBy: categoryCreatedBy,
			categoryEditedBy: categoryEditedBy,
			dateEdited: dateEdited,
			dateCreated: dateCreated
		});
	}

	toggleEditMode() {
		if(this.state.isEditing) {
			this.setState({
				isEditing: false
			});

		} else {
			this.setState({
				isEditing: true,
				newCategoryTitle: this.state.categoryTitle,
				newCategoryDescription: this.state.categoryDescription,
				newCategoryAlternativeNames: this.state.categoryAlternativeNames,
				newRelatedCategoryIDs: this.state.relatedCategoryIDs,
				newIsTopLevel: this.state.isTopLevel,
				newParentCategory: this.state.parentCategory,
				newCategoryEditedBy: this.state.categoryEditedBy,
				newDateEdited: this.state.dateEdited
			});
		}
	}

	handleChange(event) {
		var value;

		if(event.target.name == 'newRelatedCategoryIDs') {
			var options = event.target.options;
			value = [];
			for (var i = 0, l = options.length; i < l; i++) {
				if (options[i].selected) {
					value.push(Number(options[i].value));
				}
			}
		} else if(event.target.name == 'newCategoryAlternativeNames') {
			value = event.target.value.split(',');
			for (var i = 0; i < value.length; i++) {
				value[i] = $.trim(value[i]);
			}
		} else if(event.target.name == 'newParentCategory') {
			if(event.target.value == 'None') {
				this.setState({newIsTopLevel: true});
			} else {
				this.setState({newIsTopLevel: false});
			}
			value = event.target.value;
		} else {
			value = event.target.value;
		}

		this.setState({[event.target.name]: value});
	}

	onSave(event) {
		event.preventDefault();
		var timestamp = moment().format();

		var newRelatedCategoryIDs = (this.state.newRelatedCategoryIDs.length > 0) ? this.state.newRelatedCategoryIDs : 'None';
		var newIsTopLevel = this.state.newIsTopLevel;
		var newParentCategory = this.state.newParentCategory;
		var newCategoryTitle = this.state.newCategoryTitle;
		var newCategoryAlternativeNames;
		if(this.state.newCategoryAlternativeNames !== 'None' && this.state.newCategoryAlternativeNames.length > 0) {
			if(this.state.newCategoryAlternativeNames.length == 1 && this.state.newCategoryAlternativeNames[0] == '') {
				newCategoryAlternativeNames = 'None';
			} else {
				newCategoryAlternativeNames = this.state.newCategoryAlternativeNames;
			}
		} else {
			newCategoryAlternativeNames = this.state.newCategoryAlternativeNames;
		}
		var newCategoryDescription = this.state.newCategoryDescription;
		var editedBy = this.props.currentUserId[0];


		var object = {
			"id": this.state.categoryId,
			"key": this.state.categoryId,
			"subCategoryIDs": this.state.subCategoryIDs,
			"relatedCategoryIDs": newRelatedCategoryIDs,
			"isTopLevel": newIsTopLevel,
			"parentCategory": newParentCategory,
			"name": newCategoryTitle,
			"alternativeNames": newCategoryAlternativeNames,
			"description": newCategoryDescription,
			"createdBy": this.state.categoryCreatedBy,
			"editedBy": editedBy,
			"dateCreated": this.state.dateCreated,
			"dateEdited": timestamp,
		}

		this.setState({
			object: {object},
			relatedCategoryIDs: newRelatedCategoryIDs,
			isTopLevel: newIsTopLevel,
			parentCategory: newParentCategory,
			categoryTitle: newCategoryTitle,
			categoryAlternativeNames: newCategoryAlternativeNames,
			categoryDescription: newCategoryDescription,
			categoryCreatedBy: this.state.categoryCreatedBy,
			categoryEditedBy: editedBy,
			dateCreated: this.state.dateCreated,
			dateEdited: timestamp
		});

		this.toggleEditMode();

		this.props.editCategory(object, this.state.categoryId, this.state.originalParentCategory, newParentCategory);
	}

	onDelete() {
		var allCategories = this.props.allCategories;
		if (allCategories[this.state.categoryId].count) {
			alert("You can not delete a category while there are examples for it in any language.");
		} else if(allCategories[this.state.categoryId].subCategoryIDs !== 'None') {
			alert("You can not delete a category while it has subcategories.");
		} else {
			this.props.deleteCategory(this.state.categoryId);
			browserHistory.push('/');
		}
	}

	categoryOption(category, i) {
		return (
			<option key={i} value={category.id}>{category.name}</option>
		);
	}

	categoryNames(categoryId, i) {
		// console.log("categoryNames attributes: ", categoryId, i);
		var categoryName;
		if(categoryId == 'None') {
			categoryName = "None";
			return (
				<span key={i}>{categoryName}</span>
			);
		} else if (categoryId == this.state.categoryId) {
			categoryName = (this.props.allCategories[categoryId].name) ? this.props.allCategories[categoryId].name : '';
			return (
				<span key={i} className="thisCategory">{categoryName}</span>
			);
		} else {
			categoryName = (this.props.allCategories[categoryId].name) ? this.props.allCategories[categoryId].name : '';
			return (
				<span key={i}><Link to={`/category/${categoryId}`}>{categoryName}</Link></span>
			);
		}
	}

	checkCategoryIds(value) {
		// console.log("checkCategoryIds value: ", value);
		if ((value == 'None') || (value.length <= 0)) {
			// console.log("111");
			return (
				<span key="0">None</span>
			);
		} else if (Array.isArray(value)) {
			// console.log("222");
			return (
				value.map(this.categoryNames)
			);
		} else {
			// console.log("333");
			var categoryName = (this.props.allCategories) ? this.props.allCategories[value].name : '';
			return (
				<span key="0"><Link to={`/category/${value}`}>{categoryName}</Link></span>
			);
		}
	}

	splitElements(value, index) {
		return(
			<span key={index}>{value}</span>
		);
	}

	renderCategoryInfo() {
		var thisCategory = (this.props.allCategories[this.state.categoryId]) ? this.props.allCategories[this.state.categoryId] : null;

		var categoryTitle = this.state.categoryTitle;
		var categoryDescription = this.state.categoryDescription;
		var categoryAlternativeNames = (this.state.categoryAlternativeNames) ? this.state.categoryAlternativeNames : 'None';
		var subCategoryIDs = (this.state.subCategoryIDs) ? this.state.subCategoryIDs : 'None';
		var relatedCategoryIDs = (this.state.relatedCategoryIDs) ? this.state.relatedCategoryIDs : 'None';
		var categoryId = this.state.categoryId;
		var isTopLevel = this.state.isTopLevel;
		var parentCategory = (this.state.parentCategory) ? this.state.parentCategory : 'None';
		var categoryCreatedBy = this.state.categoryCreatedBy;
		var categoryEditedBy = this.state.categoryEditedBy;
		var dateEdited = this.state.dateEdited;
		var dateCreated = this.state.dateCreated;
		var siblingCategories = 'None';

		if(parentCategory) {
			if(isTopLevel) {
				siblingCategories = this.props.topCategories;
			} else {
				if(this.props.allCategories[parentCategory]) {
					if(this.props.allCategories[parentCategory].subCategoryIDs) {
						siblingCategories = this.props.allCategories[parentCategory].subCategoryIDs;
					}
				}
			}
		}
		// console.log("state: ", this.state);
		// console.log("parentCategory: ", parentCategory)

		if(this.state.isEditing) {
			return (
				<div className="categoryInfo">
					<form onSubmit={this.onSave}>
						<div>
							<label htmlFor="newCategoryTitle">Name:</label>
							<input name="newCategoryTitle" id="enterName" ref="enterName" value={this.state.newCategoryTitle} onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="newCategoryDescription">Description:</label>
							<textarea name="newCategoryDescription" id="enterDescription" cols="30" rows="5" ref="enterDescription" value={this.state.newCategoryDescription} onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="newCategoryAlternativeNames">Related/Alternative Names:<span>(Separate names by commas)</span></label>
							<input name="newCategoryAlternativeNames" id="enterRelatedNames" ref="enterRelatedNames" value={this.state.newCategoryAlternativeNames} onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="newParentCategory">Select Parent Category:</label>
							<select name="newParentCategory" id="selectParentCategory" ref="selectParentCategory" value={this.state.newParentCategory} onChange={this.handleChange}>
								<option key={-1} value="None">None</option>
								{this.props.allCategories.map(this.categoryOption)}
							</select>
						</div>
						<div>
							<label htmlFor="newRelatedCategoryIDs">Select Related Categories:<span>(Optional. Multiple selections allowed)</span></label>
							<select name="newRelatedCategoryIDs" id="selectRelatedCategories" ref="selectRelatedCategories" multiple={true} value={this.state.newRelatedCategoryIDs} onChange={this.handleChange}>
								{this.props.allCategories.map(this.categoryOption)}
							</select>
						</div>

						<div className="siblingCategoriesEdit">
							<p><span>Sibling Categories: </span><span>{this.checkCategoryIds(siblingCategories)}</span></p>
						</div>

						<div className="subCategoriesEdit">
							<p><span>SubCategories: </span><span>{this.checkCategoryIds(subCategoryIDs)}</span></p>
						</div>
						
						<button className="submitButton" type="submit" id="submit"><i className="fa fa-floppy-o" aria-hidden="true"></i>Save Category</button>
					</form>

					<button className="cancelButton" onClick={this.toggleEditMode}><i className="fa fa-ban" aria-hidden="true"></i>Cancel</button>
				</div>
			);
		} else {
			return (
				<div className="categoryInfo">
					<h2 className="category">{categoryTitle}</h2>
					<p className="description">Description: <span className="content">{categoryDescription}</span></p>
					<p className="alternativeNames">Alternative Names: <span className="content">{
						(categoryAlternativeNames !== 'None') ? categoryAlternativeNames.map(this.splitElements) : categoryAlternativeNames}</span></p>
					<p className="parentCategory">Parent Category: <span className="content">{this.checkCategoryIds(parentCategory)}</span></p>
					<p className="siblingCategories">Sibling Categories: <span className="content">{this.checkCategoryIds(siblingCategories)}</span></p>
					<p className="subCategories">SubCategories: <span className="content">{this.checkCategoryIds(subCategoryIDs)}</span></p>
					<p className="relatedCategories">Related Categories: <span className="content">{this.checkCategoryIds(relatedCategoryIDs)}</span></p>
					<button className="editButton" onClick={this.toggleEditMode}><i className="fa fa-pencil" aria-hidden="true"></i>Edit Category</button>
					<button className="deleteButton" onClick={this.onDelete}><i className="fa fa-trash-o" aria-hidden="true"></i>Delete Category</button>
				</div>
			);
		}
		// {(siblingCategories !== 'None') ? this.checkCategoryIds(siblingCategories) : 'None'}
	}

	render() {
		if (this.props.allDataLoaded && (this.props.allCategories[this.state.categoryId])) {
			return (
				<div className='categoryInfo-container'>
					{this.renderCategoryInfo()}
				</div>
			);
		} else {
			return (
				<div className='categoryInfo-container'>
					Data Not Loaded...
				</div>
			);
		}
		
	}
}


CategoryInfo.propTypes = {
	allCategories: PropTypes.array,
	topCategories: PropTypes.array,
	allUsers: PropTypes.array,
	allDataLoaded: PropTypes.bool,
	currentUserId: PropTypes.array,
	editCategory: PropTypes.func,
	deleteCategory: PropTypes.func,
	thisCategoryId: PropTypes.number
};

// CategoryInfo.defaultProps = {

// };

export default CategoryInfo;
