import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import jqueryui from 'jquery-ui';

// Styles
import './test.scss';


class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div id="test">
				Testing...
			</div>

		);
	}
}

export default Test;
