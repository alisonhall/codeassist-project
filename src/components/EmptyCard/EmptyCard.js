import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { IndexLink, Link } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import classnames from 'classnames';
import $ from 'jquery';

// Styles
import './emptyCard.scss';

class EmptyCard extends Component {
	constructor(props) {
		super(props);
    }
    
    render() {
        return(
            <section className="emptyCard">
                <p>No {this.props.type} for {this.props.languageName}</p>
            </section>
        )
    }
}

EmptyCard.propTypes = {
    languageName: PropTypes.string,
    type: PropTypes.string
};

// EmptyCard.defaultProps = {

// };

export default EmptyCard;