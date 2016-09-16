import React, { Component, PropTypes } from 'react';
// import Category from 'Category';
import $ from 'jquery';



class Languages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
    this.eachLanguage = this.eachLanguage.bind(this);
    // this.remove = this.remove.bind(this);

    // if (typeof this.props.count !== 'number'){
    //  return new Error('The count property must be a number');
    // }
  }
  componentWillMount() {
    var self = this;
    $.getJSON('../../test-data.json', function(results){
      $(results.languages).each(function(index, item){
        self.add(item, index);
        
      });
    });
  }
  add(item, index) {
    var arr = this.state.languages;
    arr.push({
      id: index,
      data: item
    });
    this.setState({languages: arr});
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
  eachLanguage(language, i) {
    return (
      <li>{language.data.fullName}</li>
    );
  }
  render() {
    return (
      <div className='languages'>
        <ul>
          {this.state.languages.map(this.eachLanguage)}
          <li><em>End of language list</em></li>
        </ul>
      </div>

    );
  }
}

// Languages.propTypes = {
//  count: PropTypes.number
// };

// Languages.defaultProps = {

// };

export default Languages;
