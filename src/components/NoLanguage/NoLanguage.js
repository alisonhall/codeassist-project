import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './noLanguage.scss';


class NoLanguage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='noLanguage-container'>
				<h1>No Language!</h1>
				<p>You need to select a language to start.</p>
			</div>
		);
	}
}

// NoContent.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// NoContent.defaultProps = {

// };

export default NoLanguage;
