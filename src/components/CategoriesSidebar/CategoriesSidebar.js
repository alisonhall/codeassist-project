import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

		this.singleCategory = this.singleCategory.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.toggleShow = this.toggleShow.bind(this);
		this.checkForSubCategory = this.checkForSubCategory.bind(this);
	}

	checkForSubCategory(categoryId, i) {
		// console.log("checkForSubCategory categoryId", categoryId, i);
		if (this.props.allCategories[categoryId].subCategoryIDs == 'None') {
			// console.log("childCategory categoryId", categoryId, i);
			return (
				<li key={i}>
					<Accordion
						key={i}
						item={this.props.allCategories[categoryId]}
						subContent={null}
						params={this.props.params}
					/>
				</li>
			);
		} else {
			// console.log("parentCategory categoryId", categoryId, i);
			return (
				<li key={i}>
					<Accordion
						key={i}
						item={this.props.allCategories[categoryId]}
						subContent={this.props.allCategories[categoryId].subCategoryIDs.map(this.checkForSubCategory)}
						params={this.props.params}
					/>
					{/*}<ul>
						{this.props.allCategories[categoryId].subCategoryIDs.map(this.checkForSubCategory)}
					</ul>{*/}
				</li>
			);
		}
	}

	singleCategory(category, i) {
		// console.log("singleCategory category", category, i);
		return(
			<Accordion
				key={category.id}
				item={category}
				subContent={null}
				params={this.props.params}
			/>
		);
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
						<ul>
							{this.props.topCategories.map(this.checkForSubCategory)}
						</ul>
						{/*}{this.props.allCategories.map(this.singleCategory)}{*/}
						<button id="createCategory">
							<Link to='/create/category'><i className="fa fa-plus" aria-hidden="true"></i><span>Category</span></Link>
						</button>
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
	topCategories: PropTypes.array,
	params: PropTypes.object
};

// CategoriesSidebar.defaultProps = {
// 	dataLoaded: false
// };

export default enhanceWithClickOutside(CategoriesSidebar);
