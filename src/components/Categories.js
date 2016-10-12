import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';


class Categories extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	dataLoaded: props.dataLoaded,
		// 	allCategories: [],
		// 	topCategories: []
		// };
		// this.topCategory = this.topCategory.bind(this);
		// this.subCategory = this.subCategory.bind(this);
		// this.eachCategory = this.eachCategory.bind(this);
		// this.waitForElement = this.waitForElement.bind(this);

		// var self = this;
		// $.getJSON('../../test-data.json', function(results){
		// 	$.each(results.categories, function(index, item) {
		// 		self.add(item, index);
		// 	});
		// 	// this.state.dataLoaded = true;
		// });
	}

	componentDidMount() {
		// this.waitForElement($('.accordion'));

		// $( ".accordion" ).accordion({
		//     collapsible: true
		// });
	}

	// waitForElement(element) {
	//     if(typeof element !== "undefined"){
	//         this.setState.dataLoaded = true;
	//         return true;
	//     }
	//     else{
	//         setTimeout(function(){
	//             this.waitForElement(element);
	//         }, 1000);
	//     }
	// }


	// add(item, index) {
	// 	var allCategories = this.state.allCategories;
	// 	var topCategories = this.state.topCategories;
	// 	allCategories[index] = item;
	// 	if(item.isTopLevel){
	// 		topCategories.push(index);
	// 	}
	// 	this.setState({allCategories: allCategories, topCategories: topCategories});
	// }

	eachCategory(category, i) {
		console.log("eachCategory");
		console.log(category, i);
		// console.log(this.state.allCategories[category]);
		// console.log("     category: " + category + ", i: " + i + "     ");

		return ("     category: " + category + ", i: " + i + "     ");

		// if (this.state.allCategories[category]) {
		// 	// console.log(this.state.allCategories[category]);
		// 	return (
		// 		<div key={i}>
		// 			<p>{category.name}</p>
		// 		</div>
		// 	);
		// }
		
	}

	subCategory(category, i) {
		console.log("subCategory");
		// console.log(category, i);
		// console.log(this.state.allCategories[category]);
		// return ("     category: " + category + ", i: " + i + "     ");

		// var content = '';
		for (var j = category.length - 1; j >= 0; j--) {
			console.log("For loop " + j);
			// return({this.state.allCategories[category[j]].name})
			// this.eachCategory(this.state.allCategories[category[j]], category[j]);
			// content += this.eachCategory(this.state.allCategories[category[j]], category[j]);
			// content += this.eachCategory(this.state.allCategories[category[j]], category[j]);
			// content += {this.state.allCategories[category[j]].name};
			// content += {this.state.allCategories[i].name}
			// var wait = this.waitForElement(this.props.allCategories[category[j]].name);

			// if(wait) {
				return(
					<div key={category[j]}>
						<p>{this.props.allCategories[category[j]].name}</p>
					</div>
				);
			// }
		}

		// return content;

		// return (
		// 	{this.state.allCategories.category.name}
		// );

		// return (
		// 	{this.state.allCategories[category].name}
		// );

		// return (
		// 	{category.map(this.eachCategory)}
		// );
		
	}

	topCategory(category, i) {
		console.log(category, i);
		console.log(this.props.allCategories[category].name);
		return ("     category: " + category + ", i: " + i + "     ");

		// if(this.props.allCategories[category].subCategoryIDs){
		// 	return (
		// 		<div key={i} className='accordion'>
		// 			<p>{this.props.allCategories[category].name}</p>
		// 			<div>{this.subCategory(this.props.allCategories[category].subCategoryIDs, i)}</div>

		// 		</div>
		// 	);
		// } else {
		// 	return (
		// 		<div key={i}>
		// 			<p>{this.props.allCategories[category].name}</p>

		// 		</div>
		// 	);
		// }

		

		// return (
		// 	<div key={i}>
		// 		<p>{this.state.allCategories[category].name}</p>
		// 		<p>{this.state.allCategories[category].subCategoryIDs.map(this.subCategory)}</p>

		// 	</div>
		// );

		
	}

	render() {
		// console.log(this.props.topCategories);
		if (this.props.allDataLoaded) {
			return (
				<div className='categories'>
					{this.props.topCategories.map(this.topCategory)}
				</div>

			);
		} else {
			return (
				<div className='categories'>
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
