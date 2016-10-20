import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Styles
import './header.scss';


class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				<div className="container-fluid">
					<div className="row">
						<div id="logo" className="col-md-3 col-md-offset-1">
							<h1>Code Assist</h1>
						</div>
						<div id="searchBar" className="col-md-3 col-md-offset-4">
							<input type="search" placeholder="Search"></input>
							<i className="fa fa-search" aria-hidden="true"></i>
						</div>
						<div id="login">
							<a href="#">
								Sign up <i className="fa fa-user" aria-hidden="true"></i>
							</a>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

// Header.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// Header.defaultProps = {

// };

export default Header;
