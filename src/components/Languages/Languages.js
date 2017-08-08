import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './languages.scss';


class Languages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectValue: '',
			numSelected: 0,
			selectDisabled: false
		};

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.eachLanguage = this.eachLanguage.bind(this);
		this.displayLanguage = this.displayLanguage.bind(this);
	}

	componentDidMount() {
		this.setState({numSelected: this.props.selectedLanguages.length});
		if(this.props.selectedLanguages.length == 3) {
			this.setState({selectDisabled: true});
		} else {
			this.setState({selectDisabled: false});
		}
	}

	handleSelectChange(event) {
		if(event.target.value !== "Select languages") {
			this.setState({selectValue: event.target.value});
			this.props.addToSelectedLanguages(event.target.value);
			if(this.state.numSelected == 2) {
				this.setState({
					selectValue: '',
					numSelected: 3,
					selectDisabled: true
				});
			} else {
				this.setState({
					selectValue: '',
					numSelected: this.state.numSelected + 1,
					selectDisabled: false
				});
			}
		}
	}

	handleDelete(key) {
		this.props.removeSelectedLanguage(key);
		this.setState({
			numSelected: this.state.numSelected - 1,
			selectDisabled: false
		});
		
	}

	eachLanguage(language, i) {
		const isSelected = this.props.selectedLanguages.indexOf(language.id);
		if(isSelected > -1) {
			return (
				<option value={language.id} key={i} disabled="true">{language.fullName}</option>
			);
		} else {
			return (
				<option value={language.id} key={i}>{language.fullName}</option>
			);
		}
		
	}

	displayLanguage(id, i) {
		if(this.props.allLanguages[id]) {
			return (
				<div key={i} value={i} className={classnames(`language${i+1}`)} onClick={this.handleDelete} onClick={() => this.handleDelete(i)}>
					<p>{this.props.allLanguages[id].fullName}</p>
					<i className="fa fa-close" aria-hidden="true"></i>
				</div>
			);
		}
	}

	render() {
		return (
			<div className={classnames('languages-container', 'col-lg-3 col-lg-offset-9')}>
				{this.props.selectedLanguages.map(this.displayLanguage)}
				<select id="languageFilter" ref='selectLanguage' onChange={this.handleSelectChange} value={this.state.selectValue} disabled={this.state.selectDisabled} >
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
