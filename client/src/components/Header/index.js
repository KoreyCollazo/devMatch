import React from 'react';

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link id="logo" to={`/`}>
          DevMatch
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <Link id="login" to={`/login`}>
            Login
          </Link>
        </ul>
      </div>
    </nav>
  );
}
