import React, { Component, PropTypes } from 'react';
// import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import $ from 'jquery';
// import jqueryui from 'jquery-ui';

// Components
import Page from './../components/Page/Page.js';


class OpenedExampleCardView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var contentComponent = 'openedexamplecard';
		return(
			<div className='content-container'>
				<Page contentComponent={contentComponent} params={this.props.params} />
			</div>
		);
	}
}

// OpenExampleCardView.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// OpenExampleCardView.defaultProps = {
// 	allDataLoaded: false
// };

export default OpenedExampleCardView;
