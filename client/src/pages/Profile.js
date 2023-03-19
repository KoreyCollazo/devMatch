import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(profileId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { profileId: profileId }
  });

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return (
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div>
          <div class="gap-patch">
            <div class="circle"></div>
          </div>
          <div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile?.firstName) {
    return (
      <div classNameName="row">
        <div classNameName="col s2 m12">
          <div classNameName="card">
            <div classNameName="card-content">
              <h4>You need to be logged in to see your profile page.</h4>
            </div>
            <div classNameName="card-action">
              <button lassName="waves-effect waves-light btn greengit">
                <Link id="login" to={`/login`}>
                  Login
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col s12 m6">
        <div className="card">
          <div className="card-image">
            <img
              id="profile-picture"
              alt="headshot"
              src="https://img.icons8.com/plasticine/12x/morty-smith.png"
            />
            <span className="card-title">John Smith, 20 Y/O</span>
            <div className="btn-floating halfway-fab waves-effect waves-light green">
              <i className="material-icons"></i>
            </div>
          </div>
          <div className="card-content">
            <p>
              I am a very simple card. I am good at containing small bits of information. I am
              convenient because I require little markup to use effectively.
            </p>
          </div>
          <div id="row">
            <div id="buttons">
              <button id="dislike" className="waves-effect waves-light btn red" tab-index="1">
                <span classNameName="dislike-emoji">Nope</span>
              </button>
              <button id="letter" className="waves-effect waves-light btn orange" tab-index="2">
                <span classNameName="fa fa-instagram">Message</span>
              </button>
              <button id="like" className="waves-effect waves-light btn green" tab-index="1">
                <span classNameName="like-emoji">Yep</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
