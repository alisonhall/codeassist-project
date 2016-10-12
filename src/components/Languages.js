import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';
import jqueryui from 'jquery-ui';


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

	// componentDidMount() {
	// 	$( "#combobox" ).combobox();
	// }

	eachLanguage(language, i) {
		return (
			<option value={language.name} key={i}>{language.fullName}</option>
		);
	}

	render() {

		return (
			<div className='languages'>
				<label>Select a programming language: </label>
				<select id="combobox">
					<option value="">Select one...</option>
					{this.props.allLanguages.map(this.eachLanguage)}
				</select>
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
