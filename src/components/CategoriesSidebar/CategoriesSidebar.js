import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import $ from 'jquery';

// Components
import Accordion from './../Accordion/Accordion.js';

// Styles
import './categoriesSidebar.scss';


class CategoriesSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSidebar: false
		};

		this.topCategory = this.topCategory.bind(this);
		this.subCategory = this.subCategory.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
	}

	subCategory(category, i) {
		// console.log("subCategory");
		for (var j = category.length - 1; j >= 0; j--) {
			// console.log("For loop " + j);

			return(
				<Accordion
					key={category[j]}
					index={Number(category[j])}
					title={this.props.allCategories[category[j]].name}
					item={this.props.allCategories[category[j]]}
					subContent={null}
				/>
			);
		}
		
	}

	topCategory(category, i) {
		var categoryId = Number(this.props.allCategories[category].id);

		if (this.props.allCategories[category].subCategoryIDs) {
			return (
				<Accordion
					key={categoryId}
					index={categoryId}
					title={this.props.allCategories[category].name} 
					item={this.props.allCategories[category]}
					subContent={this.props.allCategories[category].subCategoryIDs.map(this.subCategory)}
				/>
			);
		} else {
			return (
				<Accordion
					key={categoryId}
					index={categoryId}
					title={this.props.allCategories[category].name} 
					item={this.props.allCategories[category]}
					subContent={null}
				/>
			);
		}
	}

	handleClickOutside() {
		this.setState({showSidebar: false});
	}

	toggleShow(event) {
		event.preventDefault();
		if(this.state.showSidebar) {
			this.setState({showSidebar: false});
		} else {
			this.setState({showSidebar: true});
		}
	}

	render() {
		if (typeof this.props.allDataLoaded !== "undefined") {
			var showStatus = (this.state.showSidebar) ? '' : 'hide';

			return (
				<div className={classnames('categoriesSidebar-container', `${showStatus}`)}>
					<button id="showCategories" onClick={this.toggleShow}>Categories<i className="fa fa-bars fa-rotate-270" aria-hidden="true"></i></button>
					<div className={classnames('categoriesList')} ref={(div) => this.categoriesList = div}>
						{this.props.topCategories.map(this.topCategory)}
					</div>
				</div>

			);
		} else {
			return (
				<div className='categoriesSidebar-container'>
					Data Not Loaded ....
				</div>

			);
		}
	}
}

CategoriesSidebar.propTypes = {
	allDataLoaded: PropTypes.bool,
	allCategories: PropTypes.array,
	topCategories: PropTypes.array
};

// CategoriesSidebar.defaultProps = {
// 	dataLoaded: false
// };

export default enhanceWithClickOutside(CategoriesSidebar);
