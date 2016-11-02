import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames';
import enhanceWithClickOutside from 'react-click-outside';
import $ from 'jquery';

// Styles
import './editMenu.scss';


class EditMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
		this.toggleClick = this.toggleClick.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	handleClickOutside() {
		this.setState({isOpen: false});
	}

	toggleClick(event) {
		event.preventDefault();
		if(this.state.isOpen) {
			this.setState({isOpen: false});
		} else {
			this.setState({isOpen: true});
		}
	}

	render() {
		var isOpen = (this.state.isOpen) ? 'open' : '';
		return (
			<div className={classnames('editMenu-container', `${isOpen}`)}>
				<button onClick={this.toggleClick}>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</button>
			</div>
		);
	}
}

// EditMenu.propTypes = {
// 	allDataLoaded: PropTypes.bool
// };

// EditMenu.defaultProps = {

// };

export default enhanceWithClickOutside(EditMenu);
