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
		this.state = {
			selectValue: ''
		};

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.displayLanguage = this.displayLanguage.bind(this);
	}

	handleSelectChange(event) {
		this.setState({selectValue: event.target.value});
		this.props.addToSelectedLanguages(event.target.value);
	}

	eachLanguage(language, i) {
		return (
			<option value={language.id} key={i}>{language.fullName}</option>
		);
	}

	displayLanguage(id, i) {
		return (
			<div key={i}>
				<p>{this.props.allLanguages[id].fullName}</p>
			</div>
		);
	}

	render() {

		return (
			<div className="languages-container" className="col-lg-3 col-lg-offset-9">
				{this.props.selectedLanguages.map(this.displayLanguage)}
				<select id="languageFilter" ref='selectLanguage' onChange={this.handleSelectChange} value={this.state.selectValue}>
					<option>Select language filters</option>
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
