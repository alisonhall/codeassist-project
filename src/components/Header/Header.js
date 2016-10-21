import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

// Styles
import './header.scss';


class Header extends Component {
	constructor(props) {
		super(props);
	}

	onSearchHandler(event) {
		event.preventDefault();
		// <Link to='/searchResults'></Link>
	}

	render() {
		return (
			<header>
				<div className="container-fluid">
					<div className="row">
						<div id="logo" className="col-md-3 col-md-offset-1">
							<h1>
								<Link to='/'>
									Code Assist
								</Link>
							</h1>
						</div>
						<div id="searchBar" className="col-md-3 col-md-offset-4">
							<form onSubmit={this.onSearchHandler}>
								<input type="search" placeholder="Search"></input>
								<button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
							</form>
							
						</div>
						<div id="login">
							<Link to='/user/0'>
								Sign up <i className="fa fa-user" aria-hidden="true"></i>
							</Link>
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
