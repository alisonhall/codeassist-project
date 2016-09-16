import React, { Component, PropTypes } from 'react';
import $ from 'jquery';


class Category extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
		this.edit = this.edit.bind(this);
		this.save = this.save.bind(this);
		this.remove = this.remove.bind(this);
	}
	edit() {
		this.setState({editing: true});
	}
	save() {
		this.props.onChange(this.myTextInput.value, this.props.index);
		this.setState({editing: false});
	}
	remove() {
		this.props.onRemove(this.props.index);
	}
	renderDisplay() {
		return (
			<div className='category' ref={function(newCategory){}}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit} className='btn btn-primary glyphicon glyphicon-pencil'/>
					<button onClick={this.remove} className='btn btn-danger glyphicon glyphicon-trash'/>
				</span>
			</div>
			);
	}
	renderForm() {
		return (
			<div className='category' style={this.style}>
			<textarea ref={(ref) => this.myTextInput = ref} defaultValue={this.props.children} className='form-control'></textarea>
			<button onClick={this.save} className='btn btn-success btn-sm glyphicon glyphicon-floppy-disk' />
			</div>
			);
	}
	render() {
		if (this.state.editing) {
			return this.renderForm();
		}
		else {
			return this.renderDisplay();
		}
	}
}

Category.propTypes = {
	onChange: PropTypes.func,
	onRemove: PropTypes.func,
	index: PropTypes.number
};

// Category.defaultProps = {

// };

export default Category;
