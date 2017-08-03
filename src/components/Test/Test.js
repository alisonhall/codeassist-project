import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
// import jqueryui from 'jquery-ui';
// import { Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

// Styles
import './test.scss';


class Test extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div id="test">
				<Link to='/'>Code Assist</Link>
				<ul>
					<li><Link to="/test">Test</Link></li>
					<li><Link to="/test/about">About</Link></li>
					<li><Link to="/test/accordion">Accordion</Link></li>
					<li><Link to="/test/categoriessidebar">CategoriesSidebar</Link></li>
					<li><Link to="/test/createsnippet">CreateSnippet</Link></li>
					<li><Link to="/test/examplecards">ExampleCards</Link></li>
					<li><Link to="/test/examples">Examples</Link></li>
					<li><Link to="/test/footer">Footer</Link></li>
					<li><Link to="/test/header">Header</Link></li>
					<li><Link to="/test/home">Home</Link></li>
					<li><Link to="/test/languages">Languages</Link></li>
					<li><Link to="/test/login">Login</Link></li>
					<li><Link to="/test/nocontent">NoContent</Link></li>
					<li><Link to="/test/nolanguage">NoLanguage</Link></li>
					<li><Link to="/test/openexamplecard">OpenExampleCard</Link></li>
					<li><Link to="/test/opensyntaxcard">OpenSyntaxCard</Link></li>
					<li><Link to="/test/searchresults">SearchResults</Link></li>
					<li><Link to="/test/syntaxcards">SyntaxCards</Link></li>
					<li><Link to="/test/usersettings">UserSettings</Link></li>
				</ul>
				
			</div>

		);
	}
}

export default Test;
