import React, { Component } from 'react';
import M from "materialize-css";

import { Link } from 'react-router-dom';

class Header extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link id="logo" to={`/`}>DevMatch</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <Link id="login"  to={`/login`}>Login</Link>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;
