import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

// Styles
import './accordion.scss';


class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			isHovered: false,
			isSelected: false
		};
		this.select = this.select.bind(this);
	}

	select() {
		this.setState({isSelected: true})
	}

	render() {
		const selected = (this.state.isSelected ? this.state.active : this.props.active);

		if(this.props.subContent == null) {
			return(
				<div className="accordion noContent" onClick={this.select}>
					<p>{this.props.title}</p>
				</div>
			);
		} else {
			return(
				<div className="accordion hasContent" onClick={this.select}>
					<p>{this.props.title}</p>
					<div className="accordionContent">
						{this.props.subContent}
					</div>
				</div>
			);
		}
	}
}

Accordion.propTypes = {
	title: PropTypes.string,
	item: PropTypes.object,
	subContent: PropTypes.array
};

// Accordion.defaultProps = {
// 	dataLoaded: false
// };

export default Accordion;
