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

        
          {Auth.loggedIn() ? (
            

          
        <ul id="dropdown1" class="dropdown-content">
            <>
             <li> <Link id="logout" onClick={logout}>Logout</Link></li>
            </>
        </ul>
          ) : (
            <ul id="nav-mobile" class="right hide-on-med-and-down"><Link id="login" to={`/login`}>
              Login
            </Link></ul>
          
          )}
      </div>
    </nav>
  );
}
