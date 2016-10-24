import React, { Component, PropTypes } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery';
// import jqueryui from 'jquery-ui';

// Components
import Page from './../components/Page/Page.js';


class Error404 extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var contentComponent = 'error404';
		return(
			<div className='content-container'>
				<Page contentComponent={contentComponent} params={this.props.params} />
			</div>
		);
	}
}

// Error404.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// Error404.defaultProps = {
// 	allDataLoaded: false
// };

export default Error404;
