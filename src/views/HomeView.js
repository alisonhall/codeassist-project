import React, { Component } from 'react';
import Page from './../components/Page/Page.js';
import Home from './../components/Home/Home.js';

class HomeView extends Component {
 render() {

  return (
    <div>
      <Page {...header} >
        Test
      </Page>
    </div>
   );
  }
}

export default HomeView;
