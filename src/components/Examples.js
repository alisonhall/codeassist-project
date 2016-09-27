import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';



class Examples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allExamples: []
		};
		this.eachExample = this.eachExample.bind(this);

		var self = this;
		$.getJSON('../../test-data.json', function(results){
			$.each(results.examples, function(index, item) {
				self.add(item, index);
			});
		});
	}

	add(item, index) {
		var allExamples = this.state.allExamples;
		allExamples[index] = item;
		this.setState({allExamples: allExamples});
	}

	eachExample(example, i) {
		return (
			<li key={i}>{example.description}</li>
		);
	}

	render() {
		return (
			<div className='examples'>
				<ul>
					{this.state.allExamples.map(this.eachExample)}
					<li><em>End of examples list</em></li>
				</ul>
			</div>

		);
	}
}

// Categories.propTypes = {
//  count: PropTypes.number
// };

// Categories.defaultProps = {

// };

export default Examples;
