import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Styles
import './examples.scss';


class Examples extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	allExamples: []
		// };
		// this.eachExample = this.eachExample.bind(this);

		// var self = this;
		// $.getJSON('../../test-data.json', function(results){
		// 	$.each(results.examples, function(index, item) {
		// 		self.add(item, index);
		// 	});
		// });
	}

	// add(item, index) {
	// 	var allExamples = this.state.allExamples;
	// 	allExamples[index] = item;
	// 	this.setState({allExamples: allExamples});
	// }

	eachExample(example, i) {
		return (
			<section key={i}>
				<p>Category: {example.categoryID}</p>
				<p>Language: {example.language}</p>
				<h3>Description: {example.description}</h3>
				<p>Level: {example.level}</p>
				<p>Ranking: {example.ranking}</p>
				<p>Created By: {example.createdBy}</p>
				<p>{example.dateCreated}</p>
				<p>Edited By: {example.editedBy}</p>
				<p>{example.dateEdited}</p>
				<pre className={example.language}><code>{example.codeText}</code></pre>
			</section>
		);
	}

	render() {
		return (
			<div className='examples'>
				{this.props.allExamples.map(this.eachExample)}
			</div>

		);
	}
}

Examples.propTypes = {
	allExamples: PropTypes.array
};

// Examples.defaultProps = {

// };

export default Examples;
