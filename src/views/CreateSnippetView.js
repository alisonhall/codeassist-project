import React, { Component, PropTypes } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery';
// import jqueryui from 'jquery-ui';

// Components
import Page from './../components/Page/Page.js';


class CreateSnippetView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var contentComponent = 'createsnippet';
		return(
			<div className='content-container'>
				<Page contentComponent={contentComponent} params={this.props.params} />
			</div>
		);
	}
}

// CreateSnippetView.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// CreateSnippetView.defaultProps = {
// 	allDataLoaded: false
// };

export default CreateSnippetView;
