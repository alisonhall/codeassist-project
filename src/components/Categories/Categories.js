import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import $ from 'jquery';

// Components
import Accordion from './../Accordion/Accordion.js';

// Styles
import './categories.scss';


class Categories extends Component {
	constructor(props) {
		super(props);
		this.topCategory = this.topCategory.bind(this);
		this.subCategory = this.subCategory.bind(this);
	}

	subCategory(category, i) {
		// console.log("subCategory");
		for (var j = category.length - 1; j >= 0; j--) {
			// console.log("For loop " + j);

			return(
				<Accordion
					key={category[j]}
					title={this.props.allCategories[category[j]].name}
					item={this.props.allCategories[category[j]]}
					subContent={null}
				/>
			);
		}
		
	}

	topCategory(category, i) {

		if (this.props.allCategories[category].subCategoryIDs) {
			return (
				<Accordion
					key={i}
					title={this.props.allCategories[category].name} 
					item={this.props.allCategories[category]}
					subContent={this.props.allCategories[category].subCategoryIDs.map(this.subCategory)}
				/>
			);
		} else {
			return (
				<Accordion
					key={i}
					title={this.props.allCategories[category].name} 
					item={this.props.allCategories[category]}
					subContent={null}
				/>
			);
		}
	}

	render() {
		if (typeof this.props.allDataLoaded !== "undefined") {
			return (
				<div className='categories-container'>
					{this.props.topCategories.map(this.topCategory)}
				</div>

			);
		} else {
			return (
				<div className='categories-container'>
					Data Not Loaded ....
				</div>

			);
		}
	}
}

Categories.propTypes = {
	allDataLoaded: PropTypes.bool,
	allCategories: PropTypes.array,
	topCategories: PropTypes.array
};

// Categories.defaultProps = {
// 	dataLoaded: false
// };

export default Categories;
