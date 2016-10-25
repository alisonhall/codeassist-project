import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
				<h1>Error!</h1>
				<p>Have you selected a language?</p>
				<p>This category may not have any content for the selected language(s)</p>
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
