import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';



class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
		this.eachCategory = this.eachCategory.bind(this);
		// this.remove = this.remove.bind(this);

		// if (typeof this.props.count !== 'number'){
		// 	return new Error('The count property must be a number');
		// }
	}
	componentWillMount() {
		var self = this;
		$.getJSON('../../test-data.json', function(results){
			$(results.categories).each(function(index, item){
				self.add(item, index);
				
			});
		});
	}
	add(item, index) {
		var arr = this.state.categories;
		arr.push({
			id: index,
			data: item
		});
		this.setState({categories: arr});
	}
	// eachCategory(category, i) {
	// 	return (
	// 		<Category key={category.id}
	// 			index={i}
	// 			onChange={this.update.bind(this)}
	// 			onRemove={this.remove}
	// 		>{category.category}</Category>
	// 	);
	// }
	eachCategory(category, i) {
		return (
			<li>{category.data.fullName}</li>
		);
	}
	render() {
		return (
			<div className='categories'>
				<ul>
					{this.state.categories.map(this.eachCategory)}
					<li><em>End of category list</em></li>
				</ul>
			</div>

		);
	}
}

// Categories.propTypes = {
// 	count: PropTypes.number
// };

// Categories.defaultProps = {

// };

export default Categories;
