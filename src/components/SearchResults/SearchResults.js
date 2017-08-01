import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './searchResults.scss';


class SearchResults extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='searchResults-container'>
				<h1>Search Results</h1>
			</div>
		);
	}
}

// SearchResults.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// SearchResults.defaultProps = {

// };

export default SearchResults;
