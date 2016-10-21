import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

// Styles
import './footer.scss';


class Footer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<footer>
				<div className="row col-md-12">
					<span id="legalTerms" className=""><a href="#">legal</a> | <a href="#">terms & conditions</a> | <Link to='/about'>about us</Link></span>
					<span id="copyright" className="">copyright 2016</span>
				</div>
			</footer>
		);
	}
}

// Footer.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// Footer.defaultProps = {

// };

export default Footer;
