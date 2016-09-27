import React, { Component } from 'react';
// import Category from 'Category';
import $ from 'jquery';


class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCategories: [],
			topCategories: []
		};
		this.eachCategory = this.eachCategory.bind(this);

		var self = this;
		$.getJSON('../../test-data.json', function(results){
			$.each(results.categories, function(index, item) {
				self.add(item, index);
			});
		});
	}

	add(item, index) {
		var allCategories = this.state.allCategories;
		allCategories[index] = item;
		this.setState({allCategories: allCategories});
	}

	eachCategory(category, i) {
		return (
			<li key={i}>{category.name}</li>
		);
	}

	render() {
		return (
			<div className='categories'>
				<ul>
					{this.state.allCategories.map(this.eachCategory)}
					<li><em>End of category list</em></li>
				</ul>
			</div>

		);
	}
}

export default Categories;
