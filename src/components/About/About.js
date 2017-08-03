import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './about.scss';


class About extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='about-container'>
				<h1>About Us</h1>
			</div>
		);
	}
}

// About.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// About.defaultProps = {

// };

export default About;
