import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './noContent.scss';


class NoContent extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='noContent-container'>
				<h1>No Content!</h1>
				<p>This category does not have any content for the selected language(s).</p>
			</div>
		);
	}
}

// NoContent.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// NoContent.defaultProps = {

// };

export default NoContent;
