import React from 'react';
import Auth from '../../utils/auth';

import { Link } from 'react-router-dom';

export default function Header() {
  
  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('userId');
    Auth.logout();
  };
  return (
    <nav>
      <div className="nav-wrapper">
        <Link id="logo" to={`/`}>
          devMatch
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
        {Auth.loggedIn() ? (
          <button onClick={logout}>Logout</button>
         ):(
          <Link id="login" to={`/login`}>
            Login
          </Link>
          )}
          
        </ul>
      </div>
    </nav>
  );
}