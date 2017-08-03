import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './login.scss';


class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='login-container'>
				<h1>Login to Code Assist</h1>
			</div>
		);
	}
}

// Login.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// Login.defaultProps = {

// };

export default Login;
