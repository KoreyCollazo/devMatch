import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(profileId ? QUERY_SINGLE_PROFILE : QUERY_ME, {
    variables: { profileId: profileId }
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <div class="row">
        <div class="col s2 m12">
          <div class="card">
            <div class="card-content">
              <h4>
                You need to be logged in to see your profile page.
              </h4>
            </div>
            <div class="card-action">
              <Link id="login"  to={`/login`}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <img
          id="profile-picture"
          alt="headshot"
          src="https://gyazo.com/db9f7075f60979081a9da8ec47453bec.png"
        />
        <h className="header-text">John Smith, 20 Y/O</h>
      </div>
      <div id="social-media">
        <div id="social-links">
          <button id="dislike" className="social-btn" tab-index="1">
            <span className="dislike-emoji">👎</span>
          </button>
          <button id="letter" className="social-btn" title="Instagram" tab-index="2">
            <span className="fa fa-instagram">💌</span>
          </button>
          <button id="like" className="social-btn" tab-index="1">
            <span className="like-emoji">👍</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
