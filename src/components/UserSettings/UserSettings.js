import React, { Component, PropTypes } from 'react';
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
