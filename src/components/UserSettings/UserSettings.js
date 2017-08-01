import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './userSettings.scss';


class UserSettings extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='userSettings-container'>
				<h1>User Settings</h1>
			</div>
		);
	}
}

// UserSettings.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// UserSettings.defaultProps = {

// };

export default UserSettings;
