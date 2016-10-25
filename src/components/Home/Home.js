import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
