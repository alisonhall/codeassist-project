import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';



class Examples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      examples: []
    };
    this.eachExample = this.eachExample.bind(this);
    // this.remove = this.remove.bind(this);

    // if (typeof this.props.count !== 'number'){
    //  return new Error('The count property must be a number');
    // }
  }
  componentWillMount() {
    var self = this;
    $.getJSON('../../test-data.json', function(results){
      $(results.examples).each(function(index, item){
        self.add(item, index);
        
      });
    });
  }
  add(item, index) {
    var arr = this.state.examples;
    arr.push({
      id: index,
      data: item
    });
    this.setState({examples: arr});
  }
  // eachCategory(category, i) {
  //  return (
  //    <Category key={category.id}
  //      index={i}
  //      onChange={this.update.bind(this)}
  //      onRemove={this.remove}
  //    >{category.category}</Category>
  //  );
  // }
  eachExample(example, i) {
    return (
      <li>{example.data.description}</li>
    );
  }
  render() {
    return (
      <div className='examples'>
        <ul>
          {this.state.examples.map(this.eachExample)}
          <li><em>End of example list</em></li>
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
