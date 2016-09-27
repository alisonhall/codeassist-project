import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';



class Languages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allLanguages: [],
			selectedLanguages: []
		};
		this.eachLanguage = this.eachLanguage.bind(this);

		var self = this;
		$.getJSON('../../test-data.json', function(results){
			$.each(results.languages, function(el, item) {
				// console.log(el, item);
				self.add(item, el);
			});
		});
	}

	add(item, el) {
		console.log(item, el);
		var allLanguages = this.state.allLanguages;
		allLanguages[el] = item;
		this.setState({allLanguages: allLanguages});
		console.log(this.state);
	}

	eachLanguage(language, i) {
		// console.log(language, i);
		return (
			<li key={i}>{language.name}</li>
		);
	}

	render() {

		return (
			<div className='languages'>
				<ul>
					{this.state.allLanguages.map(this.eachLanguage)}
					<li><em>End of language list</em></li>
				</ul>
			</div>

		);
	}
}

// Languages.propTypes = {
//  count: PropTypes.number
// };

// Languages.defaultProps = {

// };

export default Languages;
