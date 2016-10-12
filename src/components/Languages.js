import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';


class Languages extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	allLanguages: [],
		// 	selectedLanguages: []
		// };
		// this.eachLanguage = this.eachLanguage.bind(this);

		// var self = this;
		// $.getJSON('../../test-data.json', function(results){
		// 	$.each(results.languages2, function(el, item) {
		// 		self.add(item, el);
		// 	});
		// });
	}

	// add(item, el) {
	// 	var allLanguages = this.state.allLanguages;
	// 	allLanguages[el] = item;
	// 	this.setState({allLanguages: allLanguages});
	// }

	eachLanguage(language, i) {
		return (
			<li key={i}>{language.fullName}</li>
		);
	}

	render() {

		return (
			<div className='languages'>
				<ul>
					{this.props.allLanguages.map(this.eachLanguage)}
				</ul>
			</div>

		);
	}
}

Languages.propTypes = {
	allLanguages: PropTypes.array
};

// Languages.defaultProps = {

// };

export default Languages;
