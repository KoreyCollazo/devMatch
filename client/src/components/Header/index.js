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
        {Auth.loggedIn() ? (
          <><Link id="logo" to={`/profile`}>
            devMatch
          </Link><ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <Link id="tab" to="/profile">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link id="tab" to="/about">
                  Profile Settings
                </Link>
              </li>
              <li>
                {' '}
                <Link id="logout" onClick={logout} to="/">
                  Logout
                </Link>
              </li>
            </ul></>
         
        ) : (
          <><Link id="logo" to={`/`}>
              devMatch
            </Link><ul id="nav-mobile" class="right hide-on-med-and-down">
                <Link id="login" to={`/login`}>
                  Login
                </Link>
              </ul></>
        )}
      </div>
    </nav>
  );
}
