import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './languages.scss';


class Languages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: ''
		};

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.displayLanguage = this.displayLanguage.bind(this);
	}

	handleSelectChange(event) {
		this.setState({selectValue: event.target.value});
		this.props.addToSelectedLanguages(event.target.value);
	}

	handleDelete(key) {
		this.props.removeSelectedLanguage(key);
	}

	eachLanguage(language, i) {
		return (
			<option value={language.id} key={i}>{language.fullName}</option>
		);
	}

	displayLanguage(id, i) {
		return (
			<div key={i} value={i} className={classnames(`language${i+1}`)} onClick={this.handleDelete} onClick={() => this.handleDelete(i)}>
				<p>{this.props.allLanguages[id].fullName}</p>
				<i className="fa fa-close" aria-hidden="true"></i>
			</div>
		);
	}

	render() {

		return (
			<div className={classnames('languages-container', 'col-lg-3 col-lg-offset-9')}>
				{this.props.selectedLanguages.map(this.displayLanguage)}
				<select id="languageFilter" ref='selectLanguage' onChange={this.handleSelectChange} value={this.state.selectValue}>
					<option>Select languages</option>
					{this.props.allLanguages.map(this.eachLanguage)}
				</select>
			</div>

		);
	}
}

Languages.propTypes = {
	allLanguages: PropTypes.array,
	selectedLanguages: PropTypes.array,
	addToSelectedLanguages: PropTypes.func,
	removeSelectedLanguage: PropTypes.func
};

// Languages.defaultProps = {

// };

export default Languages;
