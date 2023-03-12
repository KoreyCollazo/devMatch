import React, { Component } from 'react';
import M from "materialize-css";

import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

class Header extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <nav>
        <div class="nav-wrapper">
          <Link id="logo" to={`/home}`}>DevMatch</Link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <Link id="login"  to={`/login}`}>Login</Link>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Header;
