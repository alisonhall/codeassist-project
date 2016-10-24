import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
// import jqueryui from 'jquery-ui';
// require('jquery-ui/ui/widgets/selectmenu.js');
// require('jquery-ui/ui/widgets/autocomplete.js');

// Styles
import './languages.scss';


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


	handleChange(e, key) {
	    const language = this.props.allLanguages[key];
	    this.props.addToSelectedLanguages(key);
	  }

	eachLanguage(language, i) {
		return (
			<option value={language.name} key={i}>{language.fullName}</option>
		);
	}

	render() {

		return (
			<div className="languages-container" className="col-lg-3 col-lg-offset-9">
				<select id="languageFilter" ref='selectLanguage' onChange={this.handleChange}>
					<option value="">Select language filters</option>
					{this.props.allLanguages.map(this.eachLanguage)}
				</select>
			</div>

		);
	}
}

Languages.propTypes = {
	allLanguages: PropTypes.array,
	selectedLanguages: PropTypes.array,
	addToSelectedLanguages: PropTypes.func
};

// Languages.defaultProps = {

// };

export default Languages;
