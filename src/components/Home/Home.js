import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './home.scss';


class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='home-container'>
				<h1>Welcome to Code Assist!</h1>
			</div>
		);
	}
}

// Home.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// Home.defaultProps = {

// };

export default Home;
