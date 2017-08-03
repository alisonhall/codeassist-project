import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route, NavLink } from 'react-router-dom';
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
		// console.log("this.props", this.props);
		// console.log("this.props.item", this.props.item);
		// if(match.params.categoryId == this.props.item.id) {
		// 	this.setState({isActive: true});
		// }

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
					<span className="link"><NavLink 
						activeClassName='active' 
						to={'/category/' + this.state.categoryId}>
							{this.state.name}
					</NavLink></span>
				</div>
			);
		} else {
			return(
				<div className={classnames('accordion-container', 'accordion', 'hasContent', `${open}`, `${isActive}`)}>
					<span className="link"><NavLink 
						activeClassName='active' 
						to={'/category/' + this.state.categoryId}>
							{this.state.name}
					</NavLink></span>
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
	subContent: PropTypes.array
};

// Accordion.defaultProps = {
// 	dataLoaded: false
// };

export default Accordion;
