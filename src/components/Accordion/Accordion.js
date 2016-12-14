import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './accordion.scss';


class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			isActive: false,
			name: '',
			categoryId: ''
		};

		this.deselect = this.deselect.bind(this);
		this.select = this.select.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentWillMount() {
		if(this.props.params.categoryId == this.props.item.id) {
			this.setState({isActive: true});
		}

		this.setState({
			name: this.props.item.name,
			categoryId: this.props.item.id
		})
	}

	deselect() {
		this.setState({isOpen: false});
	}

	select() {
		this.setState({isOpen: true});
	}

	toggle() {
		if(this.state.isOpen) {
			this.deselect();
		} else {
			this.select();
		}
	}


	render() {
		// console.log("Accordion component. Item:", this.props.item);
		const open = (this.state.isOpen) ? 'open' : '';
		const isActive = (this.state.isActive) ? 'active' : '';

		const buttonContent = (this.state.isOpen) ? 'fa-chevron-up' : 'fa-chevron-down';

		if(this.props.subContent == null) {
			return(
				<div className={classnames('accordion-container', 'accordion', 'noContent', `${open}`, `${isActive}`)}>
					<span className="link"><IndexLink 
						activeClassName='active' 
						to={'/category/' + this.state.categoryId}>
							{this.state.name}
					</IndexLink></span>
				</div>
			);
		} else {
			return(
				<div className={classnames('accordion-container', 'accordion', 'hasContent', `${open}`, `${isActive}`)}>
					<span className="link"><IndexLink 
						activeClassName='active' 
						to={'/category/' + this.state.categoryId}>
							{this.state.name}
					</IndexLink></span>
					<button className="accordion-button" onClick={this.toggle}><i className={classnames('fa', `${buttonContent}`)} aria-hidden="true"></i></button>
					<ul className="accordion-content">
						{this.props.subContent}
					</ul>
				</div>
			);
		}
	}
}

Accordion.propTypes = {
	item: PropTypes.object,
	subContent: PropTypes.array,
	params: PropTypes.object
};

// Accordion.defaultProps = {
// 	dataLoaded: false
// };

export default Accordion;
