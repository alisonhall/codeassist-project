import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
