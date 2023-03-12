import React, { Component } from 'react';
import M from "materialize-css";

import { Link } from 'react-router-dom';

class Header extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div class="section no-pad-bot" id="index-banner">
        <div class="container">
         
          <h3 class="header center orange-text">Connecting hearts and code</h3>
          <div class="row center">
            <h5 class="header col s12 light">Dating app for software developers</h5>
          </div>
          <div class="center-align">
            <button class="waves-effect waves-light btn-large" href="#">Get Started</button>
          </div>
        
      </div>
    </div>
    );
  }
};

export default Header;