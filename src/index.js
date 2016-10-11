import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './components/Categories.js';
import Languages from './components/Languages.js';
import Examples from './components/Examples.js';
import $ from 'jquery';

ReactDOM.render(
  <Categories />,
  document.getElementById('react-categories')
);

ReactDOM.render(
  <Languages />,
  document.getElementById('react-languages')
);

ReactDOM.render(
  <Examples />,
  document.getElementById('react-examples')
);

$( function() {
    $( ".accordion" ).accordion();
  } );