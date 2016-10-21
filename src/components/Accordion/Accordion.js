import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { IndexLink } from 'react-router';

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
				<div className="accordion-container accordion noContent" onClick={this.select}>
					<IndexLink 
						activeClassName='active' 
						to={'/category/' + this.props.index}>
							{this.props.title}
					</IndexLink>
				</div>
			);
		} else {
			return(
				<div className="accordion-container accordion hasContent" onClick={this.select}>
					<IndexLink 
						activeClassName='active' 
						to={'/category/' + this.props.index}>
							{this.props.title}
					</IndexLink>
					<div className="accordionContent">
						{this.props.subContent}
					</div>
				</div>
			);
		}
	}
}

Accordion.propTypes = {
	index: PropTypes.number,
	title: PropTypes.string,
	item: PropTypes.object,
	subContent: PropTypes.array
};

// Accordion.defaultProps = {
// 	dataLoaded: false
// };

export default Accordion;
