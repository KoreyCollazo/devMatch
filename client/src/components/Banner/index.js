import React, { Component } from 'react';
import M from 'materialize-css';

import { Link } from 'react-router-dom';

class Header extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  // Where is the get started button going bring us?
  render() {
    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <h3 className="header center orange-text">Connecting hearts and code</h3>
          <div className="row center">
            <h5 className="header col s12 light">Dating app for software developers</h5>
          </div>
          <div className="center-align">
            <Link className="waves-effect waves-light btn-large" to="/signup">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
