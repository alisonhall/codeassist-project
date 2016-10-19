import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Styles
import './createSnippet.scss';


class CreateSnippet extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='createSnippet-container'>
				<h1>Create Snippet</h1>
			</div>
		);
	}
}

// CreateSnippet.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// CreateSnippet.defaultProps = {

// };

export default CreateSnippet;
